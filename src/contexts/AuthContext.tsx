import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "@/routes/paths";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        setIsAuthenticated(true);
        navigate(PATHS.APP.DASHBOARD);
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate(PATHS.AUTH.LOGIN);
    }

    const value = { isAuthenticated, login, logout };

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