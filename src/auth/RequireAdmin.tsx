import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function RequireAdmin() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.userType !== 'ADMIN') {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}
