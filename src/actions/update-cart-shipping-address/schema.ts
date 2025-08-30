import { z } from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.uuid("ID do endereço inválido"),
});

export type UpdateCartShippingAddressInput = z.infer<
  typeof updateCartShippingAddressSchema
>;
