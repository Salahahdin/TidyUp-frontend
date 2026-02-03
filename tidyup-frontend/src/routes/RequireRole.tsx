import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireRole({ role }: { role: 'ADMIN' | 'USER' }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ADMIN może dostępować do wszystkiego, USER może tylko do stron USER
  const hasAccess = user.role === 'ADMIN' || user.role === role;

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
