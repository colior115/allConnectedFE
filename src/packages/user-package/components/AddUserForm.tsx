import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { CreateUserInput, User } from '../types/user';

export interface AddUserFormProps {
  canAddNewUser: (email: string) => Promise<boolean>;
  onSuccess?: (user: User) => void;
  onCancel?: () => void;
}

interface AddUserFormInternalProps extends AddUserFormProps {
  createUser: (data: CreateUserInput) => Promise<User>;
}

export function AddUserForm({ canAddNewUser, createUser, onSuccess, onCancel }: AddUserFormInternalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const canAdd = await canAddNewUser(email);
      if (!canAdd) {
        setError(t('user.emailAlreadyExists'));
        return;
      }
      const user = await createUser({ email, firstName, lastName, role: 'user' });
      onSuccess?.(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.unknownError'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}
    >
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
        <Label htmlFor="firstName">{t('user.firstName')}</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="lastName">{t('user.lastName')}</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? t('user.adding') : t('user.add')}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t('user.cancel')}
          </Button>
        )}
      </div>
    </form>
  );
}
