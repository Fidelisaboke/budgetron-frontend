import { motion } from "framer-motion";
import type React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-teal-50">
            <header className="bg-teal-800 text-white p-4">
                <h1 className="text-2xl font-bold">Budgetron</h1>
            </header>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow flex flex-col"
            >
                <main className="w-full flex-grow flex flex-col items-center justify-center p-4">
                    {children}
                </main>
            </motion.div>
            <footer className="bg-teal-800 text-white p-4 mt-auto">
                <p className="text-sm text-center text-teal-200">
                    &copy; {new Date().getFullYear()} Budgetron. All rights reserved.
                </p>
            </footer>
        </div>
    )
}