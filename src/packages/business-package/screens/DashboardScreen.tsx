import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { Button, Title } from '../../../components';

interface Props extends ScreenWithNavigationProps {
  onLogout: () => Promise<void>;
}

export function DashboardScreen({ navigation, onLogout }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Title size="large">{t('dashboard.title')}</Title>
      <Button onClick={() => navigation.navigate('AddEmployee')}>{t('dashboard.addEmployee')}</Button>
      <Button onClick={() => navigation.navigate('EmployeesList')}>{t('employee.viewEmployees')}</Button>
      <Button variant="ghost" onClick={onLogout}>{t('auth.logout')}</Button>
    </div>
  );
}
