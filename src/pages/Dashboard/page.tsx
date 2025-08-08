import AppLayout from "@/components/AppLayout.tsx";
import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import {aggregateDashboardMetrics} from "@/utils/dashboardMetrics.ts";
import { type Transaction } from "@/schemas/transaction.ts";
import APP_PATHS from "@/routes/paths.ts";
import {ArrowRightIcon, Loader2} from "lucide-react";
import type React from "react";


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
                >
                    <div className="text-2xl font-semibold">
                        {`Ksh. ${metrics.totalIncome.toLocaleString()}`}
                    </div> 
                </OverviewCard>
                <OverviewCard 
                    title={"Total Expenses"} 
                    isLoading={isLoading}
                >
                    <div className="text-2xl font-semibold">
                        {`Ksh. ${metrics.totalExpenses.toLocaleString()}`}
                    </div> 
                </OverviewCard>
                <OverviewCard 
                    title={"Total Net Income"} 
                    isLoading={isLoading}
                >
                    {metrics.totalIncome >= 0 ? (
                        <div className="text-2xl font-semibold text-teal-700">
                            {`Ksh. ${metrics.totalNetIncome.toLocaleString()}`}
                        </div> 
                    ): (
                        <div className="text-2xl font-semibold text-red-700">
                            {`Ksh. ${metrics.totalNetIncome.toLocaleString()}`}
                        </div> 
                    )}
                </OverviewCard>
                <OverviewCard 
                    title={"Budget Usage"} 
                    isLoading={isLoading}
                >
                    {metrics.budgetUsage < 100 ? (
                        <div className="text-2xl font-semibold text-teal-700">
                            {`${metrics.budgetUsage.toFixed(2)}%`}
                        </div> 
                    ): (
                        <div className="text-2xl font-semibold text-red-700">
                            {`${metrics.budgetUsage.toFixed(2)}%`}
                        </div> 
                    )}
                </OverviewCard>
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

function OverviewCard({title, isLoading, children}: { title: string, isLoading: boolean, children: React.ReactNode }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="text-gray-500 text-sm">{title}</div>
            {isLoading ? (
                <Loader2 className="mt-2 text-teal-700 animate-spin" />
            ) : (
                children
            )}
        </div>
    );
}