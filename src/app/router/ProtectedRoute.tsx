import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { businessId } = useParams();

  if (loading) return null;

  if (!user) return <Navigate to={`/${businessId}/login`} replace />;

  return <>{children}</>;
}
