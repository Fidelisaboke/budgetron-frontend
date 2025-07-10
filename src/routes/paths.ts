const PATHS = {
    AUTH: {
        LOGIN: "/",
        REGISTER: "/register",
    },
    APP: {
        DASHBOARD: "/dashboard",
        PROFILE: "/profile",
        SETTINGS: "/settings",
        BUDGETS: "/budgets",
        TRANSACTIONS: "/transactions",
        CATEGORIES: "/categories",
        REPORTS: "/reports",
    }
} as const;

export default PATHS;