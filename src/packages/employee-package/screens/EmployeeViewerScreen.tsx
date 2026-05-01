import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import type { EmployeeDataServiceAPI } from '../apis/employeeDataServiceAPI';
import type { Employee } from '../types/employee';

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
  const preview = navigation.getState() as Employee | undefined;

  const [employee, setEmployee] = useState<Employee | null>(preview ?? null);
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

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '2rem' }}>
          <Loader />
        </div>
      )}

      {error && <Text color={colors.error}>{error}</Text>}

      {employee && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Field label={t('user.firstName')} value={employee.firstName} />
          <Field label={t('user.lastName')} value={employee.lastName} />
          <Field label={t('auth.email')} value={employee.email} />
          <Field label={t('employee.phone')} value={employee.phone} />
          <Field label={t('employee.gender')} value={t(`employee.gender_${employee.gender}`)} />
          <Field label={t('employee.hireDate')} value={employee.hireDate} />
          <Field label={t('employee.employmentStatus')} value={t(`employee.status_${employee.employmentStatus}`)} />
          <Field label={t('employee.terminationDate')} value={employee.terminationDate} />
        </div>
      )}
    </div>
  );
}
