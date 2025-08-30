import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

export const getUseUserAddressesQueryKey = () => ["user-addresses"] as const;

export const useUserAddresses = (
  params?
: {
  initialData: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getUseUserAddressesQueryKey(),
    queryFn: () => getUserAddresses(),
    initialData: params?.initialData,
  });
};
