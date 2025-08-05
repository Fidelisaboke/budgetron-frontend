import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBudgets, createBudget } from "@/api/budgets.ts";
import { toast } from "sonner";

export function useBudgets() {
    return useQuery({
        queryKey: ["budgets"],
        queryFn: fetchBudgets,
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