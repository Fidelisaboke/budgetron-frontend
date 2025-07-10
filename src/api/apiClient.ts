import axios from "axios";

// A client for the API.
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor.
apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

// Response interceptor.
apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
)

export default apiClient;