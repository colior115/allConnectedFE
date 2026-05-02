import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Pagination, Text } from '../../../components';
import { EmployeesToolbox } from '../components/EmployeesToolbox';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { useBusinessContext } from '../../business-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { EmployeeListItem } from '../types/employee';

const PAGE_LIMIT = 20;

interface Props extends ScreenWithNavigationProps {
  getEmployees: EmployeeDataServiceAPI['getEmployees'];
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

export function EmployeesListScreen({ navigation, getEmployees }: Props) {
  const { t } = useTranslation();
  const businessContext = useBusinessContext();
  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!businessContext?.businessId) return;
    setLoading(true);
    setError(null);
    getEmployees(businessContext.businessId, { page, limit: PAGE_LIMIT, search: search || undefined })
      .then(({ data, total: tot }) => { setEmployees(data || []); setTotal(tot || 0); })
      .catch(() => setError(t('employee.errorList')))
      .finally(() => setLoading(false));
  }, [businessContext?.businessId, page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <div style={{ marginBlockEnd: '1.5rem' }}>
        <EmployeesToolbox navigation={navigation} onSearch={handleSearch} />
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '3rem' }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      {!loading && !error && employees.length === 0 && (
        <Text color={colors.textSecondary}>{t('employee.noEmployees')}</Text>
      )}

      {!loading && !error && employees.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>{t('employee.colFirstName')}</th>
                <th style={thStyle}>{t('employee.colLastName')}</th>
                <th style={thStyle}>{t('employee.colEmail')}</th>
                <th style={thStyle}>{t('employee.employmentStatus')}</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => navigation.navigate('EmployeeViewer', employee)}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.background)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>{employee.firstName}</td>
                  <td style={tdStyle}>{employee.lastName}</td>
                  <td style={tdStyle}>{employee.email ?? '—'}</td>
                  <td style={tdStyle}>{t(`employee.status_${employee.employmentStatus}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            total={total}
            limit={PAGE_LIMIT}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
