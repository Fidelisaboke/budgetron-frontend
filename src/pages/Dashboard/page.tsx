import AppLayout from "@/components/AppLayout.tsx";
import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import LoadingPage from "@/components/LoadingPage.tsx";
import {aggregateDashboardMetrics} from "@/utils/dashboardMetrics.ts";
import { type Transaction } from "@/schemas/transaction.ts";
import APP_PATHS from "@/routes/paths.ts";
import {ArrowRightIcon} from "lucide-react";


export default function Dashboard() {
    const { data: budgetsData, isLoading: budgetsLoading } = useBudgets();
    const { data: transactionsData, isLoading: transactionsLoading } = useTransactions();
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

    if (budgetsLoading || transactionsLoading || categoriesLoading) {
        return <LoadingPage />;
    }

    const budgets = budgetsData?.items || [];
    const transactions = transactionsData?.items || [];
    const categories = categoriesData?.items || [];
    const recentTransactions = transactions.slice(0, 3);

    // Dashboard Metrics
    const metrics = aggregateDashboardMetrics(
        transactions,
        budgets,
        categories
    );

    return (
        <AppLayout title={"Dashboard Overview"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <OverviewCard title={"Total Income"} value={`Ksh. ${metrics.totalIncome.toLocaleString()}`} />
                <OverviewCard title={"Total Expenses"} value={`Ksh. ${metrics.totalExpenses.toLocaleString()}`} />
                <OverviewCard title={"Budget Usage"} value={`${metrics.budgetUsage.toFixed(2)}%`} />
                <OverviewCard title={"Categories"} value={`${metrics.categoryCount}`} />
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

function OverviewCard({title, value}: { title: string, value: string }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="text-gray-500 text-sm">{title}</div>
            <div className="text-2xl font-bold text-teal-700">{value}</div>
        </div>
    );
}