"use server";

import { db } from "@/db";
import { cartTable, orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

import { headers } from "next/headers";

export const finishOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized: No active session");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  });

  if (!cart) {
    throw new Error("Not Found: Cart not found");
  }

  if (!cart.shippingAddress) {
    throw new Error("Not Found: Shipping address not found");
  }

  const totalPriceInCents = cart.items.reduce((total, item) => {
    return total + item.productVariant.priceInCents * item.quantity;
  }, 0);

  await db.transaction(async (tx) => {
    if (!cart.shippingAddress) {
      throw new Error("Not Found: Shipping address not found");
    }
    const [order] = await tx
      .insert(orderTable)
      .values({
        email: cart.shippingAddress.email,
        zipCode: cart.shippingAddress.zipCode,
        country: cart.shippingAddress.country,
        phone: cart.shippingAddress.phone,
        cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
        city: cart.shippingAddress.city,
        complement: cart.shippingAddress.complement,
        neighborhood: cart.shippingAddress.neighborhood,
        number: cart.shippingAddress.number,
        recipientName: cart.shippingAddress.recipientName,
        state: cart.shippingAddress.state,
        street: cart.shippingAddress.street,
        userId: session.user.id,
        totalPriceInCents,
        shippingAddressId: cart.shippingAddress!.id,
      })
      .returning();

    if (!order) {
      throw new Error("Error: Failed to create order");
    }

    const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
      cart.items.map((item) => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        quantity: item.quantity,
        priceInCents: item.productVariant.priceInCents,
      }));
    await tx.insert(orderItemTable).values(orderItemsPayload);
    await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
  });
};
