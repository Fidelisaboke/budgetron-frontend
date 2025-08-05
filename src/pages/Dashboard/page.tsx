import AppLayout from "@/components/AppLayout.tsx";

export default function Dashboard() {
    return (
        <AppLayout title={"Dashboard Overview"}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* TODO: Add metrics cards here */}
                <OverviewCard title={"Total Income"} value={`Ksh. ${0.00}`} />
                <OverviewCard title={"Total Expenses"} value={`Ksh. ${0.00}`} />
                <OverviewCard title={"Budget Usage"} value={`${0.00}%`} />
                <OverviewCard title={"Categories"} value={`${0}`} />
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