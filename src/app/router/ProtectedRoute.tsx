import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, appUser, loadAppUser } = useAuth();
  const { businessId } = useParams();
  const [appUserLoading, setAppUserLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!loading && user && businessId && appUser === null && !appUserLoading) {
      setAppUserLoading(true);
      loadAppUser(businessId, user.id)
        .catch(() => setUnauthorized(true))
        .finally(() => setAppUserLoading(false));
    }
  }, [loading, user, businessId, appUser, appUserLoading, loadAppUser]);

  if (loading || appUserLoading) return null;

  if (!user || unauthorized) return <Navigate to={`/${businessId}/login`} replace />;

  if (appUser && appUser.businessId !== businessId) return <Navigate to={`/${businessId}/login`} replace />;

  return <>{children}</>;
}
