import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Loader, Text, Title } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { useAuth } from '../../auth-package';

interface Props extends ScreenWithNavigationProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export function LoginScreen({ navigation, onLogin }: Props) {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigation.navigate('BusinessPicker');
    }
  }, [loading, user, navigation]);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onLogin(email, password);
      navigation.navigate('BusinessPicker');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.unknownError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      paddingInline: '1rem',
      paddingBlock: '1rem',
      background: colors.background,
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
          paddingInline: '2rem',
          paddingBlock: '2rem',
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          background: '#fff',
        }}
      >
        <Title size="large">{t('auth.loginTitle')}</Title>

        {error && <Text size="small" color={colors.error}>{error}</Text>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? t('auth.loggingIn') : t('auth.loginButton')}
        </Button>

        <Text size="small" color={colors.textSecondary}>
          {t('auth.noAccount')}{' '}
          <Button type="button" variant="ghost" onClick={() => navigation.navigate('Register')}>
            {t('auth.registerLink')}
          </Button>
        </Text>
      </form>
    </div>
  );
}
