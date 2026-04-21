import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Title } from '../../../components';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import type { ScreenWithNavigationProps } from '../../screens-package';

interface Props extends ScreenWithNavigationProps {
  onRegister: (email: string, password: string) => Promise<void>;
}

export function RegisterScreen({ navigation, onRegister }: Props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onRegister(email, password);
      setSuccess(true);
      navigation.navigate('Login');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.unknownError'));
    } finally {
      setSubmitting(false);
    }
  }

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
        <Title size='large'>
          {t('auth.registerTitle')}
        </Title>

        {success && (
          <Text size='small' color={colors.success}>
            {t('auth.registrationSuccess')}
          </Text>
        )}

        {error && (
          <Text size='small' color={colors.error}>
            {error}
          </Text>
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
            autoComplete="new-password"
            minLength={6}
          />
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? t('auth.registering') : t('auth.registerButton')}
        </Button>

        <p style={{ margin: 0, fontSize: typography.small.fontSize, textAlign: 'center', fontFamily: typography.fontFamily, color: colors.textSecondary }}>
          {t('auth.alreadyHaveAccount')}{' '}
          <Button type="button" variant="ghost" onClick={() => navigation.navigate('Login')}>
            {t('auth.loginLink')}
          </Button>
        </p>
      </form>
    </div>
  );
}
