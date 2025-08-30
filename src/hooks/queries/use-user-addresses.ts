import { getUserAddresses } from "@/actions/get-user-addresses";
import { useQuery } from "@tanstack/react-query";

export const getUseUserAddressesQueryKey = () => ["user-addresses"] as const;

export const useUserAddresses = () => {
  return useQuery({
    queryKey: getUseUserAddressesQueryKey(),
    queryFn: () => getUserAddresses(),
  });
};
