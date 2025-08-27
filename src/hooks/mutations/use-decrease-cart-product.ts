import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getUseCartQueryKey } from "../queries/use-cart"

export const getDrecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export const useDrecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: getDrecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() })
    }
  });
};
