import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory } from "@/api/categories";
import { toast } from "sonner";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category created successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}