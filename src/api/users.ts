import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints";
import { type User } from "@/schemas/user";

export const fetchUsers = async () => {
    const response = await apiClient.get(API_ENDPOINTS.USERS);
    return response.data;
}

export const createUser = async (user: User) => {
    const response = await apiClient.post(API_ENDPOINTS.USERS, user);
    return response.data;
}