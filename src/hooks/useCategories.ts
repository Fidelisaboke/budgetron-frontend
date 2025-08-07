import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "@/api/categories";
import { useAppMutation } from "./useAppMutation";
import { type Category, type CategoryFormInput } from "@/schemas/category";

export function useCategories(page: number = 1, limit: number = 10, search: string = "", categoryType: string = "all") {
    return useQuery({
        queryKey: ["categories", page, limit, search, categoryType],
        queryFn: () => fetchCategories({ page, limit, search, categoryType }),
        placeholderData: keepPreviousData,
    })
}

export function useCreateCategory() {
    return useAppMutation<Category, CategoryFormInput>({
        mutationFn: createCategory,
        queryKey: "categories",
        successMsg: "Category created successfully.",
    });
}

export function useUpdateCategory() {
    return useAppMutation<Category, {id: number; data: CategoryFormInput }>({
        mutationFn: updateCategory,
        queryKey: "categories",
        successMsg: "Category updated successfully.",
    });
}

export function useDeleteCategory() {
    return useAppMutation<void, number>({
        mutationFn: deleteCategory,
        queryKey: "categories",
        successMsg: "Category deleted successfully.",
    })
}