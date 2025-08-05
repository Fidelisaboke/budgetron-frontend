import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type Category } from "@/schemas/category";

export const fetchCategories = async () => {
    const response = await apiClient.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
}

export const createCategory = async (category: Category) => {
    const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, category);
    return response.data;
}