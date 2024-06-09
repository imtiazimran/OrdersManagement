/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSKUs, createSKU, updateSKU, deleteSKU } from '../api/saleOrdersApi';

// React Query hooks for managing SKUs

export const useFetchSKUs = () => {
    return useQuery({
        queryKey: ['skus'],
        queryFn: fetchSKUs,
    });
};

export const useCreateSKU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSKU,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};

export const useUpdateSKU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedSKU }: { id: number; updatedSKU: any }) => updateSKU(id, updatedSKU),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};

export const useDeleteSKU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteSKU(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};
