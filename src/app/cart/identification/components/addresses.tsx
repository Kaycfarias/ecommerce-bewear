"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { shippingAddressTable } from "@/db/schema";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";
import { formatAddress } from "../../helper/address";

const customerSchema = z.object({
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

type CustomerFormValues = z.infer<typeof customerSchema>;

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

export const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const { data: userAddresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (defaultShippingAddressId) {
      setSelectedAddress(defaultShippingAddressId);
    }
  }, [defaultShippingAddressId]);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (values: CustomerFormValues) => {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);

      form.reset();
      setSelectedAddress(newAddress.id);

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      });

      toast.success("Endereço criado e vinculado ao carrinho!");
    } catch {
      toast.error("Erro ao salvar endereço. Tente novamente.");
    }
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço vinculado ao carrinho!");
      router.push("/cart/confirmation");
    } catch {
      toast.error("Erro ao vincular endereço. Tente novamente.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
            className="border rounded-lg p-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin h-6 w-6" />
                <span className="ml-2">Carregando endereços...</span>
              </div>
            ) : (
              <>
                {userAddresses?.map((address) => (
                  <div key={address.id}>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={address.id}
                        id={address.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={address.id} className="cursor-pointer">
                          <div className="text-sm">
                            <span className="font-semibold text-card-foreground">
                              {address.recipientName}
                            </span>
                            {/* TODO: USE ACCORDEON COMPONENT FOR ADDRESS DETAILS */}
                            <span className="text-muted-foreground ml-2">
                              {formatAddress(address)}
                            </span>
                          </div>
                        </Label>
                      </div>
                    </div>
                    <Separator className="mt-2" />
                  </div>
                ))}
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label
                    htmlFor="add_new"
                    className="cursor-pointer font-medium"
                  >
                    Adicionar novo endereço
                  </Label>
                </div>
              </>
            )}
          </RadioGroup>

          {selectedAddress && selectedAddress !== "add_new" && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGoToPayment}
                disabled={updateCartShippingAddressMutation.isPending}
                className="w-full md:w-auto"
              >
                {updateCartShippingAddressMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Ir para Pagamentos"
                )}
              </Button>
            </div>
          )}
        </div>

        {selectedAddress === "add_new" && (
          <div className="pt-5">
            <h3 className="text-lg font-semibold mb-6">Dados do Cliente</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="exemplo@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <PatternFormat
                            customInput={Input}
                            format="###.###.###-##"
                            mask="_"
                            placeholder="000.000.000-00"
                            onValueChange={(values) => {
                              field.onChange(values.value);
                            }}
                            value={field.value}
                            isAllowed={(values) => {
                              const cleanValue = values.value;
                              return cleanValue.length <= 11;
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <PatternFormat
                            customInput={Input}
                            format="(##) #####-####"
                            mask="_"
                            placeholder="(00) 00000-0000"
                            onValueChange={(values) => {
                              field.onChange(values.value);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <PatternFormat
                            customInput={Input}
                            format="#####-###"
                            mask="_"
                            placeholder="00000-000"
                            onValueChange={(values) => {
                              field.onChange(values.value);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o endereço" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apartamento, bloco, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado (UF)</FormLabel>
                        <FormControl>
                          <Input placeholder="SP" maxLength={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center w-full">
                  <Button
                    className="w-full md:w-auto"
                    type="submit"
                    disabled={
                      createShippingAddressMutation.isPending ||
                      updateCartShippingAddressMutation.isPending
                    }
                  >
                    {createShippingAddressMutation.isPending ||
                    updateCartShippingAddressMutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Salvar e Ir para Pagamentos"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
