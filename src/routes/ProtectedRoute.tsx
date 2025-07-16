import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import PATHS from '@/routes/paths';
import LoadingPage from '@/components/LoadingPage';

export default function ProtectedRoute() {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) return <LoadingPage />;

    if (!isAuthenticated || !user) return <Navigate to={PATHS.AUTH.LOGIN} replace />;

    return <Outlet />;
}