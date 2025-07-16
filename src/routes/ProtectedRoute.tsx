import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import PATHS from '@/routes/paths';

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to={PATHS.AUTH.LOGIN} />;
    }
    return <Outlet />;
}