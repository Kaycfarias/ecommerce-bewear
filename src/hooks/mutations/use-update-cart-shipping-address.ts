import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import type { UpdateCartShippingAddressInput } from "@/actions/update-cart-shipping-address/schema";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCartShippingAddressInput) =>
      updateCartShippingAddress(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
