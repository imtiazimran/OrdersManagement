/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, deleteOrder, fetchSaleOrders, updateOrder } from '../api/saleOrdersApi';

// React Query hooks for managing SKUs

export const useFetchOrders = () => {
    return useQuery({
        queryKey: ['skus'],
        queryFn: fetchSaleOrders,
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedSKU }: { id: number; updatedSKU: any }) => updateOrder(id, updatedSKU),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skus'] });
        },
    });
};
