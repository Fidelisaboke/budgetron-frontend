import apiClient from "./apiClient";
import API_ENDPOINTS from "./apiEndpoints.ts";
import { type Transaction } from "@/schemas/transaction.ts";

export const fetchTransactions = async () => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS);
    return response.data;
}

export const createTransaction = async (transaction: Transaction) => {
    const response = await apiClient.post(API_ENDPOINTS.TRANSACTIONS, transaction);
    return response.data;
}