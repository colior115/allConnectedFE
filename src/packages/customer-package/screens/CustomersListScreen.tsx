import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityTable, Toolbox } from '../../../components';
import { useEntityList } from '../../../hooks';
import { useBusinessContext } from '../../business-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { CustomerDataServiceAPI } from '../apis/customerDataServiceAPI';
import type { CustomerListItem } from '../types/customer';

const PAGE_LIMIT = 20;

interface Props extends ScreenWithNavigationProps {
  getCustomers: CustomerDataServiceAPI['getCustomers'];
}

export function CustomersListScreen({ navigation, getCustomers }: Props) {
  const { t } = useTranslation();
  const businessContext = useBusinessContext();

  const fetchFn = useCallback(
    (businessId: string, params: { page: number; limit: number; search?: string }) =>
      getCustomers(businessId, params),
    [getCustomers],
  );

  const { items, total, loading, error, page, handleSearch, handlePageChange } =
    useEntityList<CustomerListItem>({
      businessId: businessContext?.businessId,
      fetchFn,
      limit: PAGE_LIMIT,
      errorKey: 'customer.errorList',
    });

  const columns = [
    { key: 'name',  header: t('customer.colName'),  render: (c: CustomerListItem) => c.name },
    { key: 'type',  header: t('customer.colType'),  render: (c: CustomerListItem) => c.individual ? t('customer.individual') : t('customer.business') },
    { key: 'email', header: t('customer.colEmail'), render: (c: CustomerListItem) => c.email ?? '—' },
    { key: 'phone', header: t('customer.colPhone'), render: (c: CustomerListItem) => c.phone ?? '—' },
  ];

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <div style={{ marginBlockEnd: '1.5rem' }}>
        <Toolbox
          searchPlaceholder={t('customer.searchPlaceholder')}
          addButtonLabel={t('customer.addCustomer')}
          onSearch={handleSearch}
          onAdd={() => navigation.navigate('AddCustomer')}
        />
      </div>
      <EntityTable
        columns={columns}
        items={items}
        total={total}
        page={page}
        limit={PAGE_LIMIT}
        loading={loading}
        error={error}
        emptyMessage={t('customer.noCustomers')}
        onPageChange={handlePageChange}
        onRowClick={cust => navigation.navigate('CustomerViewer', cust)}
      />
    </div>
  );
}
