import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { Employee, EmployeeListItem } from '../types/employee';

interface Props extends ScreenWithNavigationProps {
  getEmployeeById: EmployeeDataServiceAPI['getEmployeeById'];
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

export function EmployeeViewerScreen({ navigation, getEmployeeById }: Props) {
  const { t } = useTranslation();
  const preview = navigation.getState() as EmployeeListItem | undefined;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!preview?.id) return;
    getEmployeeById(preview.id)
      .then(setEmployee)
      .catch(() => setError(t('employee.errorDetails')))
      .finally(() => setLoading(false));
  }, [preview?.id]);

  if (!preview) return null;

  const displayed = employee ?? preview;

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
        <Field label={t('user.firstName')} value={displayed.firstName} />
        <Field label={t('user.lastName')} value={displayed.lastName} />
        <Field label={t('auth.email')} value={displayed.email} />
        <Field label={t('employee.phone')} value={employee?.phone} />
        <Field label={t('employee.gender')} value={employee ? t(`employee.gender_${employee.gender}`) : undefined} />
        <Field label={t('employee.hireDate')} value={employee?.hireDate} />
        <Field label={t('employee.employmentStatus')} value={t(`employee.status_${displayed.employmentStatus}`)} />
        <Field label={t('employee.terminationDate')} value={employee?.terminationDate} />
      </div>
    </div>
  );
}
