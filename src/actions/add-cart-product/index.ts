"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (
  data: AddProductToCartSchema
): Promise<
  | { success: true }
  | { success: false; error: string; code: string }
> => {
  try {
    addProductToCartSchema.parse(data);
    
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return {
        success: false,
        error: "Você precisa estar logado para adicionar produtos ao carrinho",
        code: "USER_NOT_AUTHENTICATED",
      };
    }

    const productVariant = await db.query.productVariantTable.findFirst({
      where: (productVariant, { eq }) =>
        eq(productVariant.id, data.productVariantId),
    });
    
    if (!productVariant) {
      return {
        success: false,
        error: "Produto não encontrado ou não está mais disponível",
        code: "PRODUCT_VARIANT_NOT_FOUND",
      };
    }

    const cart = await db.query.cartTable.findFirst({
      where: (cart, { eq }) => eq(cart.userId, session.user.id),
    });

    let cartId = cart?.id;
    if (!cartId) {
      const [newCart] = await db
        .insert(cartTable)
        .values({
          userId: session.user.id,
        })
        .returning();
      cartId = newCart.id;
    }

    const cartItem = await db.query.cartItemTable.findFirst({
      where: (cartItem, { eq }) =>
        eq(cartItem.cartId, cartId) &&
        eq(cartItem.productVariantId, data.productVariantId),
    });
    
    if (cartItem) {
      await db
        .update(cartItemTable)
        .set({
          quantity: cartItem.quantity + data.quantity,
        })
        .where(eq(cartItemTable.id, cartItem.id));
    } else {
      await db.insert(cartItemTable).values({
        cartId,
        productVariantId: data.productVariantId,
        quantity: data.quantity,
      });
    }

    return { success: true };
    
  } catch {
    return {
      success: false,
      error: "Erro inesperado ao adicionar produto ao carrinho",
      code: "UNEXPECTED_ERROR",
    };
  }
};
