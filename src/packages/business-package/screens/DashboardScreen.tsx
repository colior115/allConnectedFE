import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import Button from '../../../components/Button';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { Title } from '../../../components';

interface Props extends ScreenWithNavigationProps {
  onLogout: () => Promise<void>;
}

export function DashboardScreen({ onLogout }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ fontFamily: typography.fontFamily, color: colors.textPrimary }}>
      <Title size='large'>
        {t('dashboard.title')}
      </Title>
      <Button variant="ghost" onClick={onLogout}>
        {t('auth.logout')}
      </Button>
    </div>
  );
}
