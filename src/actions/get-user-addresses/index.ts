"use server";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserAddresses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: (shippingAddress, { eq }) =>
      eq(shippingAddress.userId, session.user.id),
    orderBy: (shippingAddress, { desc }) => [desc(shippingAddress.createdAt)],
  });

  return addresses;
};
