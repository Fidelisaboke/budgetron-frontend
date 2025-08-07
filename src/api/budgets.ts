import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type Budget } from "@/schemas/budget";

export const fetchBudgets = async ({ page = 1, limit = 10}: { page?: number, limit?: number }) => {
    const response = await apiClient.get(`${API_ENDPOINTS.BUDGETS}?page=${page}&limit=${limit}`);
    return response.data;
}

export const createBudget = async (budget: Budget) => {
    const response = await apiClient.post(API_ENDPOINTS.BUDGETS, budget);
    return response.data;
}