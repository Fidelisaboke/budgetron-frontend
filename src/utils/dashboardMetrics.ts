import { type Transaction } from "@/schemas/transaction.ts";
import { type Budget } from "@/schemas/budget.ts";
import { type Category } from "@/schemas/category.ts";

export function aggregateDashboardMetrics(
    transactions: Transaction[],
    budgets: Budget[],
    categories: Category[],
) {
    // category id => category object map
    const categoryMap = Object.fromEntries(categories.map((category: Category) => [category.id, category]));

    // Sum income and expense based on category type
    let totalIncome = 0;
    let totalExpenses = 0;

    for(const txn of transactions) {
        console.log('Transaction', txn);
        const category = categoryMap[txn.category_id];
        if (category?.type === "income") {
            totalIncome += txn.amount;
        } else if (category?.type === "expense") {
            totalExpenses += txn.amount;
        }
    }

    // Total net income
    const totalNetIncome = totalIncome - totalExpenses;

    // Budget usage computation
    const totalBudget = budgets.reduce((sum: number, b: Budget) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum: number, b: Budget) => sum + b.spent, 0);
    const budgetUsage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    return {
        totalIncome,
        totalExpenses,
        totalNetIncome,
        budgetUsage,
    };
}