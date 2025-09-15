"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["AddProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("Produto adicionado ao carrinho com sucesso!");
      } else {
        // Tratar erro retornado pela action
        switch (result.code) {
          case "USER_NOT_AUTHENTICATED":
            toast.error("Você precisa fazer login para adicionar produtos.", {
              action: {
                label: "Fazer Login",
                onClick: () => redirect("/login"),
              },
            });
            break;
          case "PRODUCT_VARIANT_NOT_FOUND":
            toast.error("Este produto não está mais disponível.");
            break;
          default:
            toast.error(result.error);
        }
      }
    },
    onError: () => {
      toast.error("Erro de conexão. Tente novamente.");
    },
  });

  return (
    <Button
      className="rounded-full"
      size={"lg"}
      variant={"outline"}
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
};

export default AddToCartButton;
