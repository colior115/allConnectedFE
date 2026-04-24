import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { Button, Title } from '../../../components';

interface Props extends ScreenWithNavigationProps {
  onLogout: () => Promise<void>;
}

export function DashboardScreen({ onLogout }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
      <Title size="large">{t('dashboard.title')}</Title>
      <Button variant="ghost" onClick={onLogout}>{t('auth.logout')}</Button>
    </div>
  );
}
