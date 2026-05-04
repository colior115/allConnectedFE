import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { CustomerDataServiceAPI } from '../apis/customerDataServiceAPI';
import type { Customer, CustomerListItem } from '../types/customer';

interface Props extends ScreenWithNavigationProps {
  getCustomerById: CustomerDataServiceAPI['getCustomerById'];
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <Text size="small" color={colors.textSecondary}>{label}</Text>
      <Text>{value}</Text>
    </div>
  );
}

export function CustomerViewerScreen({ navigation, getCustomerById }: Props) {
  const { t } = useTranslation();
  const preview = navigation.getState() as CustomerListItem | undefined;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!preview?.id) return;
    getCustomerById(preview.id)
      .then(setCustomer)
      .catch(() => setError(t('customer.errorDetails')))
      .finally(() => setLoading(false));
  }, [preview?.id, getCustomerById, t]);

  if (!preview) return null;

  return (
    <div style={{ position: 'relative', paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          zIndex: 10,
        }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Field label={t('customer.colName')} value={customer?.name ?? preview.name} />
        <Field label={t('customer.colType')} value={customer ? (customer.individual ? t('customer.individual') : t('customer.business')) : undefined} />
        <Field label={t('customer.colEmail')} value={customer?.email ?? preview.email} />
        <Field label={t('customer.colPhone')} value={customer?.phone ?? preview.phone} />
        <Field label={t('customer.address')} value={customer?.address} />
      </div>
    </div>
  );
}
