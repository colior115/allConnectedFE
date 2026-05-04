import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface UseEntityListOptions<T> {
  businessId: string | undefined;
  fetchFn: (
    businessId: string,
    params: { page: number; limit: number; search?: string },
  ) => Promise<{ data: T[]; total: number }>;
  limit?: number;
  errorKey: string;
}

export interface UseEntityListResult<T> {
  items: T[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  handleSearch: (value: string) => void;
  handlePageChange: (page: number) => void;
}

export function useEntityList<T>({
  businessId,
  fetchFn,
  limit = 20,
  errorKey,
}: UseEntityListOptions<T>): UseEntityListResult<T> {
  const { t } = useTranslation();
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!businessId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    fetchFn(businessId, { page, limit, search: search || undefined })
      .then(({ data, total: tot }) => {
        if (!cancelled) { setItems(data ?? []); setTotal(tot ?? 0); }
      })
      .catch(() => { if (!cancelled) setError(t(errorKey)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [businessId, page, search, fetchFn, limit, errorKey, t]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  return { items, total, loading, error, page, handleSearch, handlePageChange };
}
