"use server";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {
  createShippingAddressSchema,
  CreateShippingAddressSchema,
} from "./schema";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const newAddress = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      RecipientName: data.fullName,
      email: data.email,
      cpfOrCnpj: data.cpf,
      phone: data.phone,
      zipCode: data.zipCode,
      street: data.address,
      number: data.number,
      complement: data.complement || "",
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      country: "Brasil",
    })
    .returning();
    
  revalidatePath("/cart/identification");

  return newAddress[0];
};
