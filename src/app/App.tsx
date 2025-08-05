import { Routes, Route } from 'react-router-dom'
import LoginPage from "@/pages/Login/page.tsx";
import RegisterPage from "@/pages/Register/page.tsx";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Dashboard from '@/pages/Dashboard/page';
import ProfilePage from '@/pages/Profile/page';
import PATHS from '@/routes/paths';
import { Toaster } from 'sonner';
import NotFoundPage from '@/pages/NotFound/page.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App(){
  const queryClient = new QueryClient();
  
  return (
    <>
      <Toaster position="top-center" richColors />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path={PATHS.APP.DASHBOARD} element={<Dashboard />} />
                <Route path={PATHS.APP.PROFILE} element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
