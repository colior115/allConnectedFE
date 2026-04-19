import { Outlet, useParams } from 'react-router-dom';
import { useBusinessDetails } from '../../hooks/useBusinessDetails';
import BusinessNotFound from '../../pages/BusinessNotFound';

export default function BusinessLayout() {
  const { businessId } = useParams();
  const { business, loading, notFound } = useBusinessDetails(businessId);

  if (loading) return null;

  if (notFound || (!business || !business.id)) return <BusinessNotFound />;

  return <Outlet />;
}
