import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchTransactions, createTransaction } from "@/api/transactions";
import { toast } from "sonner";

export function useTransactions(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["transactions", page, limit],
        queryFn: () => fetchTransactions({ page, limit }),
        placeholderData: keepPreviousData
    });
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success("Transaction created successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}
