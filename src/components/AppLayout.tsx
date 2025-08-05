import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import React, { useState } from "react";

export default function AppLayout({title, children} :{title: string, children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-6 w-full">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">{title}</h2>
            {children}
        </main>
      </div>
    </div>
  );
}