import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenWithNavigationProps } from '../../screens-package';
import { useAuth } from '../context/AuthContext';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';

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
      navigation.navigate('Dashboard');
    }
  }, [loading, user, navigation]);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onLogin(email, password);
      navigation.navigate('Dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.unknownError'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

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
        <h1 style={{ margin: '0 0 0.5rem', ...typography.h3, fontFamily: typography.fontFamily, color: colors.textPrimary }}>
          {t('auth.loginTitle')}
        </h1>

        {error && (
          <p style={{ margin: 0, fontSize: typography.small.fontSize, color: colors.error, fontFamily: typography.fontFamily }}>
            {error}
          </p>
        )}

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

        <p style={{ margin: 0, fontSize: typography.small.fontSize, textAlign: 'center', fontFamily: typography.fontFamily, color: colors.textSecondary }}>
          {t('auth.noAccount')}{' '}
          <Button type="button" variant="ghost" onClick={() => navigation.navigate('Register')}>
            {t('auth.registerLink')}
          </Button>
        </p>
      </form>
    </div>
  );
}
