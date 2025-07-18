import type React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-teal-50">
            <main className="w-full flex-grow flex flex-col items-center justify-center p-4">
                {children}
            </main>
        </div>
    )
}