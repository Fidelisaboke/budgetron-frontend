import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchCategories, createCategory } from "@/api/categories";
import { toast } from "sonner";

export function useCategories(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["categories", page, limit],
        queryFn: () => fetchCategories({ page, limit }),
        placeholderData: keepPreviousData,
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