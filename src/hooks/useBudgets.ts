import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchBudgets, createBudget } from "@/api/budgets.ts";
import { toast } from "sonner";

export function useBudgets(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["budgets", page, limit],
        queryFn: () => fetchBudgets({ page, limit }),
        placeholderData: keepPreviousData,
    })
}

export function useCreateBudget(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["budgets"]});
            toast.success("Budget created successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}