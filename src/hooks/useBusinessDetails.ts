import { useEffect, useState } from 'react';
import { apiRequest } from '../services/apiClient';

interface BusinessDetails {
  id: string;
  name: string;
}

export function useBusinessDetails(businessId: string | undefined) {
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    apiRequest(`/business/${businessId}/details`)
      .then((data: BusinessDetails) => setBusiness(data))
      .catch((e) => {
        console.error(e);
        setBusiness(null);
      })
      .finally(() => setLoading(false));
  }, [businessId]);

  return { business, loading };
}
