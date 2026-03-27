import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';

export default function ProtectedRoute({ children, role: requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Wrong role — redirect to appropriate home
    if (role === 'seller') return <Navigate to="/seller" replace />;
    if (role === 'buyer') return <Navigate to="/" replace />;
  }

  return children;
}
