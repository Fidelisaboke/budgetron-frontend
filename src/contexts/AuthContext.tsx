import { createContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (accessToken: string) => {
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', accessToken);
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}