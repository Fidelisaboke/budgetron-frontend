import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchCategories, createCategory } from "@/api/categories";
import { toast } from "sonner";

export function useCategories(page: number, limit: number = 10, search: string, categoryType: string) {
    return useQuery({
        queryKey: ["categories", page, limit, search, categoryType],
        queryFn: () => fetchCategories({ page, limit, search, categoryType }),
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