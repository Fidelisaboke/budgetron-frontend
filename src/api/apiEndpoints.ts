// Backend API Endpoints
const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login/',
        REGISTER: '/auth/register/',
        PROFILE: '/auth/me/',
    },
    USERS: '/users/',
} as const;

export default API_ENDPOINTS;