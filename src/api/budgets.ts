import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type Budget } from "@/schemas/budget";

export const fetchBudgets = async () => {
    const response = await apiClient.get(API_ENDPOINTS.BUDGETS);
    return response.data;
}

export const createBudget = async (budget: Budget) => {
    const response = await apiClient.post(API_ENDPOINTS.BUDGETS, budget);
    return response.data;
}