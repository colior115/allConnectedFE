import { Outlet, useParams } from 'react-router-dom';
import { useBusinessDetails } from '../../packages/business/hooks/useBusinessDetails';
import BusinessNotFound from '../../packages/business/pages/BusinessNotFound';

export default function BusinessLayout() {
  const { businessId } = useParams();
  const { business, loading, notFound } = useBusinessDetails(businessId);

  if (loading) return null;

  if (notFound || (!business || !business.id)) return <BusinessNotFound />;

  return <Outlet />;
}
