const PATHS = {
    AUTH: {
        LOGIN: "/",
        REGISTER: "/register",
    },
    APP: {
        DASHBOARD: "/dashboard",
        CATEGORIES: "/categories",
        BUDGETS: "/budgets",
        TRANSACTIONS: "/transactions",
        REPORTS: "/reports",
        PROFILE: "/profile",
        SETTINGS: "/settings",
    }
} as const;

export default PATHS;