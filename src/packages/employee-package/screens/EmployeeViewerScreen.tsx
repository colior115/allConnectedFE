import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text, Title } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { Employee } from '../types/employee';
import type { EmployeeRelation } from '../types/employeeRelation';

interface Props extends ScreenWithNavigationProps {
  getEmployeeById: EmployeeDataServiceAPI['getEmployeeById'];
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <Text size="small" color={colors.textSecondary}>{label}</Text>
      <Text>{String(value)}</Text>
    </div>
  );
}

export function EmployeeViewerScreen({ navigation, getEmployeeById }: Props) {
  const { t } = useTranslation();
  const relation = navigation.getState() as EmployeeRelation | undefined;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!relation?.reference) return;
    getEmployeeById(relation.reference)
      .then(setEmployee)
      .catch(() => setError(t('employee.errorDetails')))
      .finally(() => setLoading(false));
  }, [relation?.reference]);

  if (!relation) return null;

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Title size="large">{t('employee.viewerTitle')}</Title>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Field label={t('auth.email')} value={relation.user.email} />
        <Field label={t('user.firstName')} value={relation.user.firstName} />
        <Field label={t('user.lastName')} value={relation.user.lastName} />
        <Field label={t('employee.colRole')} value={relation.user.role} />
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '2rem' }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      {employee && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBlockStart: '0.5rem', borderBlockStart: `1px solid ${colors.border}` }}>
          <Field label={t('employee.salaryType')} value={t(`employee.${employee.salaryType}`)} />
          <Field label={t('employee.salaryValue')} value={employee.salaryValue} />
          <Field label={t('employee.currency')} value={employee.currency} />
        </div>
      )}
    </div>
  );
}
