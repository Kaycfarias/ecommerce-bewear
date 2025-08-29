import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z
    .string()
    .min(11, "CPF é obrigatório")
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, "");
      return cleanValue.length === 11;
    }, "CPF deve ter 11 dígitos"),
  phone: z.string().min(10, "Celular é obrigatório"),
  zipCode: z.string().min(8, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Estado deve ter 2 caracteres"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
