import { Routes, Route } from 'react-router-dom'
import LoginPage from "@/pages/Login/page.tsx";
import RegisterPage from "@/pages/Register/page.tsx";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Dashboard from '@/pages/Dashboard/page';
import PATHS from '@/routes/paths';
import { Toaster } from 'sonner';
import NotFoundPage from '@/pages/NotFound/page.tsx';

export default function App(){
    return (
      <>
      <Toaster position="top-center" richColors />
      <AuthProvider>
         <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={PATHS.APP.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      </>
    );
}
