import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import React, { useState } from "react";

export default function AppLayout({title, children} :{title: string, children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden not-odd:bg-gray-50 flex flex-col">
      <div className="shrink-0">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 w-full">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">{title}</h2>
          <div className="w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}