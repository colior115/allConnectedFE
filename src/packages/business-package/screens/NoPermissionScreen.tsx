import { useTranslation } from 'react-i18next';
import { Text } from '../../../components';

export function NoPermissionScreen() {
  const { t } = useTranslation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '0.5rem',
    }}>
      <Text size="normal">{t('noPermission.message')}</Text>
    </div>
  );
}
