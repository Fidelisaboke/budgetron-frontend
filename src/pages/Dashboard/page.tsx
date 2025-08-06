import AppLayout from "@/components/AppLayout.tsx";
import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import {aggregateDashboardMetrics} from "@/utils/dashboardMetrics.ts";
import { type Transaction } from "@/schemas/transaction.ts";
import APP_PATHS from "@/routes/paths.ts";
import {ArrowRightIcon, Loader2} from "lucide-react";


export default function Dashboard() {
    const { data: budgetsData, isLoading: budgetsLoading } = useBudgets();
    const { data: transactionsData, isLoading: transactionsLoading } = useTransactions();
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

    const budgets = budgetsData?.items || [];
    const transactions = transactionsData?.items || [];
    const categories = categoriesData?.items || [];
    const recentTransactions = transactions.slice(0, 3);

    const isLoading = budgetsLoading || transactionsLoading || categoriesLoading;

    // Dashboard Metrics
    const metrics = aggregateDashboardMetrics(
        transactions,
        budgets,
        categories
    );

    return (
        <AppLayout title={"Dashboard Overview"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <OverviewCard 
                    title={"Total Income"} 
                    isLoading={isLoading}
                    value={`Ksh. ${metrics.totalIncome.toLocaleString()}`} 
                />
                <OverviewCard 
                    title={"Total Expenses"} 
                    isLoading={isLoading}
                    value={`Ksh. ${metrics.totalExpenses.toLocaleString()}`} 
                />
                <OverviewCard 
                    title={"Budget Usage"} 
                    isLoading={isLoading}
                    value={`${metrics.budgetUsage.toFixed(2)}%`} 
                />
                <OverviewCard 
                    title={"Categories"} 
                    isLoading={isLoading}
                    value={`${metrics.categoryCount}`} 
                />
            </div>
            <div className="bg-white rounded shadow p-4">
                <div className="text-lg font-semibold mb-2 text-teal-700">Recent Transactions</div>
                <ul className="divide-y">
                    {recentTransactions.length == 0 ? (
                        <li className="py-2 text-gray-500 italic">No transactions yet.</li>
                    ) : (
                        recentTransactions.map((transaction: Transaction) => (
                            <li key={transaction.id} className="py-2">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {transaction.description}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(transaction.timestamp).toLocaleString("en-KE")}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-teal-700">
                                        Ksh. {transaction.amount.toLocaleString()}
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
                <div className="mt-4 text-right">
                    <a href={APP_PATHS.APP.TRANSACTIONS} className="inline-flex items-center gap-1 text-sm text-teal-600 hover:underline">
                        View all transactions
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}

function OverviewCard({title, isLoading, value}: { title: string, isLoading: boolean, value: string }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="text-gray-500 text-sm">{title}</div>
            {isLoading ? (
                <Loader2 className="mt-2 text-teal-700 animate-spin" />
            ) : (
                <div className="text-2xl font-bold text-teal-700">
                    {value}
                </div> 
            )}
        </div>
    );
}