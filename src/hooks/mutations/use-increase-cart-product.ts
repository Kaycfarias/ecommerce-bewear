import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { redirect } from "next/navigation";
import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["getIncreaseCartProductMutationKey", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      } else {
        // Tratar erro baseado no código
        switch (result.code) {
          case "USER_NOT_AUTHENTICATED":
            toast.error("Você precisa fazer login.", {
              action: {
                label: "Login",
                onClick: () => redirect("/login"),
              },
            });
            break;
          default:
            toast.error(result.error);
        }
      }
    },
    onError: () => {
      toast.error("Erro de conexão ao aumentar quantidade.");
    },
  });
};
