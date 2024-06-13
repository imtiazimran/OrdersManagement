import { useQuery } from "@tanstack/react-query";
import { TCustomer, fetchCustomers } from "../api/customerApi";



export const useFetchCustomers = () => {
    return useQuery<TCustomer[]>({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
        staleTime: 5000,
    })
};
