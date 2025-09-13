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
    onError: (error) => {
      if (error.message === "USER_NOT_AUTHENTICATED") {
        toast.error(
            <div className="flex flex-col gap-2 items-start">
            <span>Você precisa estar autenticado para adicionar produtos ao carrinho.</span>
            <Button
              variant="default"
              size="sm"
              className="mt-1"
              onClick={() => redirect("/login")}
            >
              Entrar
            </Button>
            </div>
        );
      } else {
        toast.error("Erro ao adicionar produto ao carrinho.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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
