import { createShippingAddress } from "@/actions/create-shipping-address";
import { CreateShippingAddressSchema } from "@/actions/create-shipping-address/schema";
import { shippingAddressTable } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseUserAddressesQueryKey } from "../queries/use-user-addresses";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    onSuccess: (newAddress) => {
      queryClient.invalidateQueries({ 
        queryKey: getUseUserAddressesQueryKey(),
        refetchType: 'active'
      });
      
      queryClient.setQueryData(
        getUseUserAddressesQueryKey(),
        (oldData: typeof shippingAddressTable.$inferSelect[] | undefined) => {
          if (!oldData) return [newAddress];
          return [newAddress, ...oldData];
        }
      );
    },
  });
};
