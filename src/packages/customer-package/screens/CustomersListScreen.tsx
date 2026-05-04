import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Pagination, Text } from '../../../components';
import { CustomersToolbox } from '../components/CustomersToolbox';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { useBusinessContext } from '../../business-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { CustomerDataServiceAPI } from '../apis/customerDataServiceAPI';
import type { CustomerListItem } from '../types/customer';

const PAGE_LIMIT = 20;

interface Props extends ScreenWithNavigationProps {
  getCustomers: CustomerDataServiceAPI['getCustomers'];
}

const thStyle: CSSProperties = {
  textAlign: 'start',
  padding: '0.625rem 1rem',
  fontFamily: typography.fontFamily,
  fontSize: typography.small.fontSize,
  fontWeight: 600,
  color: colors.textSecondary,
  borderBlockEnd: `1px solid ${colors.border}`,
  whiteSpace: 'nowrap',
};

const tdStyle: CSSProperties = {
  padding: '0.75rem 1rem',
  fontFamily: typography.fontFamily,
  fontSize: typography.body.fontSize,
  color: colors.textPrimary,
  borderBlockEnd: `1px solid ${colors.border}`,
};

export function CustomersListScreen({ navigation, getCustomers }: Props) {
  const { t } = useTranslation();
  const businessContext = useBusinessContext();
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!businessContext?.businessId) return;
    let cancelled = false;
    getCustomers(businessContext.businessId, { page, limit: PAGE_LIMIT, search: search || undefined })
      .then(({ data, total: tot }) => { if (!cancelled) { setCustomers(data ?? []); setTotal(tot ?? 0); setError(null); } })
      .catch(() => { if (!cancelled) setError(t('customer.errorList')); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [businessContext?.businessId, page, search, getCustomers, t]);

  const handleSearch = (value: string) => {
    setLoading(true);
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <div style={{ marginBlockEnd: '1.5rem' }}>
        <CustomersToolbox navigation={navigation} onSearch={handleSearch} />
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '3rem' }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      {!loading && !error && customers.length === 0 && (
        <Text color={colors.textSecondary}>{t('customer.noCustomers')}</Text>
      )}

      {!loading && !error && customers.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>{t('customer.colName')}</th>
                <th style={thStyle}>{t('customer.colType')}</th>
                <th style={thStyle}>{t('customer.colEmail')}</th>
                <th style={thStyle}>{t('customer.colPhone')}</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => navigation.navigate('CustomerViewer', customer)}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.background)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>{customer.name}</td>
                  <td style={tdStyle}>{customer.individual ? t('customer.individual') : t('customer.business')}</td>
                  <td style={tdStyle}>{customer.email ?? '—'}</td>
                  <td style={tdStyle}>{customer.phone ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} total={total} limit={PAGE_LIMIT} onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
