import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type CategoryFormInput } from "@/schemas/category";

export const fetchCategories = async (
    { 
        page = 1, 
        limit = 10,
        search = "",
        categoryType = "",
    }: {
        page?: number, 
        limit?: number,
        search?: string,
        categoryType?: string,
    }) => {
    const response = await apiClient.get(`${API_ENDPOINTS.CATEGORIES}?page=${page}&limit=${limit}&search=${search}&type=${categoryType}`);
    return response.data;
}

export const createCategory = async (data: CategoryFormInput) => {
    const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, data);
    return response.data;
}

export const updateCategory = async ({id, data}: { id: number, data: CategoryFormInput }) => {
    const response = await apiClient.patch(`${API_ENDPOINTS.CATEGORIES}${id}`, data);
    return response.data;
}

export const deleteCategory = async (id: number) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.CATEGORIES}${id}`);
    return response.data;
}