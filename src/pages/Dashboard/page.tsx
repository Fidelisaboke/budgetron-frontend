import AppLayout from "@/components/AppLayout.tsx";
import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import LoadingPage from "@/components/LoadingPage.tsx";
import {aggregateDashboardMetrics} from "@/utils/dashboardMetrics.ts";


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

    // Dashboard Metrics
    const metrics = aggregateDashboardMetrics(
        transactions,
        budgets,
        categories
    );

    return (
        <AppLayout title={"Dashboard Overview"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <OverviewCard title={"Total Income"} value={`Ksh. ${metrics.totalIncome}`} />
                <OverviewCard title={"Total Expenses"} value={`Ksh. ${metrics.totalExpenses}`} />
                <OverviewCard title={"Budget Usage"} value={`${metrics.budgetUsage.toFixed(2)}%`} />
                <OverviewCard title={"Categories"} value={`${metrics.categoryCount}`} />
            </div>
            <div className="bg-white rounded shadow p-4">
                <div className="text-lg font-semibold mb-2 text-teal-700">Recent Transactions</div>
                <ul className="divide-y">
                    <li className="py-2 text-gray-500 italic">No transactions yet.</li>
                    {/* TODO: Map recent transactions here */}
                </ul>
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