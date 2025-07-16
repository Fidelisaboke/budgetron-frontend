// Backend API Endpoints
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login/`,
        REGISTER: `${BASE_URL}/auth/register/`,
        PROFILE: `${BASE_URL}/auth/me/`,
    },
} as const;

export default API_ENDPOINTS;