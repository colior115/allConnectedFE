import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { Button } from '../../../components';

interface Props extends ScreenWithNavigationProps {
  onLogout: () => Promise<void>;
}

export function DashboardScreen({ onLogout }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingInline: '2rem', paddingBlock: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="ghost" onClick={onLogout}>{t('auth.logout')}</Button>
    </div>
  );
}
