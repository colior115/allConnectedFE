import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityTable, Toolbox } from '../../../components';
import { useEntityList } from '../../../hooks';
import { useBusinessContext } from '../../business-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { EmployeeListItem } from '../types/employee';

const PAGE_LIMIT = 20;

interface Props extends ScreenWithNavigationProps {
  getEmployees: EmployeeDataServiceAPI['getEmployees'];
}

export function EmployeesListScreen({ navigation, getEmployees }: Props) {
  const { t } = useTranslation();
  const businessContext = useBusinessContext();

  const fetchFn = useCallback(
    (businessId: string, params: { page: number; limit: number; search?: string }) =>
      getEmployees(businessId, params),
    [getEmployees],
  );

  const { items, total, loading, error, page, handleSearch, handlePageChange } =
    useEntityList<EmployeeListItem>({
      businessId: businessContext?.businessId,
      fetchFn,
      limit: PAGE_LIMIT,
      errorKey: 'employee.errorList',
    });

  const columns = [
    { key: 'firstName', header: t('employee.colFirstName'), render: (e: EmployeeListItem) => e.firstName },
    { key: 'lastName',  header: t('employee.colLastName'),  render: (e: EmployeeListItem) => e.lastName },
    { key: 'email',     header: t('employee.colEmail'),     render: (e: EmployeeListItem) => e.email ?? '—' },
    { key: 'status',    header: t('employee.employmentStatus'), render: (e: EmployeeListItem) => t(`employee.status_${e.employmentStatus}`) },
  ];

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <div style={{ marginBlockEnd: '1.5rem' }}>
        <Toolbox
          searchPlaceholder={t('employee.searchPlaceholder')}
          addButtonLabel={t('dashboard.addEmployee')}
          onSearch={handleSearch}
          onAdd={() => navigation.navigate('AddEmployee')}
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
        emptyMessage={t('employee.noEmployees')}
        onPageChange={handlePageChange}
        onRowClick={emp => navigation.navigate('EmployeeViewer', emp)}
      />
    </div>
  );
}
