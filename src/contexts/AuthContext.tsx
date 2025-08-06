import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/routes/paths";
import apiClient from "@/api/apiClient";
import API_ENDPOINTS from "@/api/apiEndpoints";

interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE)
            .then((response) => {
                setUser(response.data);
                setIsAuthenticated(true);
            }).catch(() => {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('access_token');
            }).finally(() => {
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (accessToken: string) => {
        localStorage.setItem('access_token', accessToken);
        setIsAuthenticated(true);
        setLoading(true);
        try {
            const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
            setUser(response.data);
            navigate(PATHS.APP.DASHBOARD);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('access_token');
            navigate(PATHS.AUTH.LOGIN);
        } finally {
            setLoading(false);
         }
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        setUser(null);
        navigate(PATHS.AUTH.LOGIN);
    }

    const value = { isAuthenticated, user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}