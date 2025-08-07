import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type User } from "@/schemas/user";

export const fetchUsers = async ({ page = 1, limit = 10}: { page?: number, limit?: number }) => {
    const response = await apiClient.get(`${API_ENDPOINTS.USERS}?page=${page}&limit=${limit}`);
    return response.data;
}

export const createUser = async (user: User) => {
    const response = await apiClient.post(API_ENDPOINTS.USERS, user);
    return response.data;
}