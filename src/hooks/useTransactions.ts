import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction } from "@/api/transactions";
import { toast } from "sonner";

export function useTransactions() {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
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
