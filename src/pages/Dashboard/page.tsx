import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-6 w-full">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* TODO: Add metrics cards here */}
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Total Income</div>
              <div className="text-2xl font-bold text-teal-700">$0.00</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Total Expenses</div>
              <div className="text-2xl font-bold text-teal-700">$0.00</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Budget Usage</div>
              <div className="text-2xl font-bold text-teal-700">0%</div>
            </div>
            <div className="bg-white rounded shadow p-4">
              <div className="text-gray-500 text-sm">Categories</div>
              <div className="text-2xl font-bold text-teal-700">0</div>
            </div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="text-lg font-semibold mb-2 text-teal-700">Recent Transactions</div>
            <ul className="divide-y">
              <li className="py-2 text-gray-500 italic">No transactions yet.</li>
              {/* TODO: Map recent transactions here */}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}