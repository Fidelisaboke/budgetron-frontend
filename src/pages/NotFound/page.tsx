import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-teal-50">
            <motion.h1
                className="text-6xl font-extrabold text-teal-600 mb-4 drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                404
            </motion.h1>
            <motion.h2
                className="text-2xl font-bold text-teal-800 mb-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
                Page Not Found
            </motion.h2>
            <motion.p
                className="text-lg text-teal-700 mb-8"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
                The page you are looking for does not exist.
            </motion.p>
            <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link
                    to="/"
                    className="px-6 py-2 rounded-lg bg-teal-600 text-white font-semibold shadow hover:bg-teal-700 transition-colors duration-200"
                >
                    Go to Login
                </Link>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 rounded-lg border border-teal-600 text-teal-600 font-semibold shadow hover:bg-teal-100 transition-colors duration-200"
                >
                    Go Back
                </button>
            </motion.div>
        </div>
    );
}