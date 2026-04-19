import { useEffect, useState } from 'react';
import { apiRequest } from '../services/apiClient';
import { fromBusinessPublicDetailsDTO } from '../mappers/businessMapper';
import type { BusinessPublicDetailsDTO } from '../types/dto/businessDTO';
import type { BusinessPublicDetails } from '../types/models/business';

export function useBusinessDetails(businessId: string | undefined) {
  const [business, setBusiness] = useState<BusinessPublicDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    apiRequest(`/business/${businessId}/details`)
      .then((dto: BusinessPublicDetailsDTO) => setBusiness(fromBusinessPublicDetailsDTO(dto)))
      .catch((e) => {
        console.error(e);
        setBusiness(null);
      })
      .finally(() => setLoading(false));
  }, [businessId]);

  return { business, loading };
}
