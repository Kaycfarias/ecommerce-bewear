"use server";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import {
  updateCartShippingAddressSchema,
  type UpdateCartShippingAddressInput,
} from "./schema";

export async function updateCartShippingAddress(
  input: UpdateCartShippingAddressInput,
) {
  const validatedInput = updateCartShippingAddressSchema.parse(input);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: User not authenticated");
  }

  try {
    // Verifica se o endereço pertence ao usuário autenticado
    const shippingAddress = await db.query.shippingAddressTable.findFirst({
      where: (shippingAddressTable, { eq, and }) =>
        and(
          eq(shippingAddressTable.id, validatedInput.shippingAddressId),
          eq(shippingAddressTable.userId, session.user.id),
        ),
    });

    if (!shippingAddress) {
      throw new Error("Forbidden: Shipping address not found or access denied");
    }

    // Busca o carrinho ativo do usuário
    const existingCart = await db.query.cartTable.findFirst({
      where: eq(cartTable.userId, session.user.id),
    });

    if (!existingCart) {
      throw new Error("Error: Cart not found");
    }

    // Atualiza o carrinho com o shipping address
    await db
      .update(cartTable)
      .set({
        shippingAddressId: validatedInput.shippingAddressId,
      })
      .where(eq(cartTable.id, existingCart.id));

    return { success: true };
  } catch (error) {
    console.error("Error updating cart shipping address:", error);
    throw new Error("Error updating cart shipping address");
  }
}
