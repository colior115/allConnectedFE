import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import Button from '../../../components/Button';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';

interface Props extends ScreenWithNavigationProps {
  onLogout: () => Promise<void>;
}

export function DashboardScreen({ onLogout }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ fontFamily: typography.fontFamily, color: colors.textPrimary }}>
      <h1 style={{ ...typography.h2, margin: '0 0 1.5rem', fontFamily: typography.fontFamily, color: colors.textPrimary }}>
        {t('dashboard.title')}
      </h1>
      <Button variant="ghost" onClick={onLogout}>
        {t('auth.logout')}
      </Button>
    </div>
  );
}
