import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../api/customerApi";

export const useFetchCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
        staleTime: 5000,
    })
};
