import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type Category } from "@/schemas/category";

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

export const createCategory = async (category: Category) => {
    const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, category);
    return response.data;
}