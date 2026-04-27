import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { useBusinessContext } from '../../business-package';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { EmployeeRelation } from '../types/employeeRelation';

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
  const [relations, setRelations] = useState<EmployeeRelation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessContext?.businessId) return;
    getEmployees(businessContext.businessId)
      .then(setRelations)
      .catch(() => setError(t('employee.errorList')))
      .finally(() => setLoading(false));
  }, [businessContext?.businessId]);

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '3rem' }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      {!loading && !error && relations.length === 0 && (
        <Text color={colors.textSecondary}>{t('employee.noEmployees')}</Text>
      )}

      {!loading && !error && relations.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>{t('employee.colEmail')}</th>
                <th style={thStyle}>{t('employee.colFirstName')}</th>
                <th style={thStyle}>{t('employee.colLastName')}</th>
                <th style={thStyle}>{t('employee.colRole')}</th>
              </tr>
            </thead>
            <tbody>
              {relations.map((relation) => (
                <tr
                  key={relation.reference}
                  onClick={() => navigation.navigate('EmployeeViewer', relation)}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.background)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>{relation.user.email}</td>
                  <td style={tdStyle}>{relation.user.firstName}</td>
                  <td style={tdStyle}>{relation.user.lastName}</td>
                  <td style={tdStyle}>{relation.user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
