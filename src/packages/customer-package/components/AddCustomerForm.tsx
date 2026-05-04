import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { CreateCustomerInput, Customer } from '../types/customer';

export interface AddCustomerFormProps {
  businessId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface AddCustomerFormInternalProps extends AddCustomerFormProps {
  createCustomer: (data: CreateCustomerInput) => Promise<Customer>;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,}$/;

function validateFields(
  values: { name: string; email: string; phone: string },
  t: (key: string) => string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 1) errors.name = t('customer.nameRequired');
  if (values.email && !EMAIL_RE.test(values.email)) errors.email = t('validation.invalidEmail');
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = t('validation.invalidPhone');
  return errors;
}

export function AddCustomerForm({
  businessId,
  createCustomer,
  onSuccess,
  onCancel,
}: AddCustomerFormInternalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [individual, setIndividual] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const clearFieldError = (field: keyof FieldErrors) =>
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));

  const validateField = (field: keyof FieldErrors, value: string) => {
    const errors = validateFields({ name, email, phone, [field]: value }, t);
    setFieldErrors(prev => ({ ...prev, [field]: errors[field] }));
  };

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const errors = validateFields({ name, email, phone }, t);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      await createCustomer({
        businessId,
        name: name.trim(),
        individual,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
      });
      onSuccess?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('auth.unknownError'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}
    >
      {submitError && <Text size="small" color={colors.error}>{submitError}</Text>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="name">{t('customer.name')}</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); clearFieldError('name'); }}
          onBlur={e => validateField('name', e.target.value)}
          error={fieldErrors.name}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="individual">{t('customer.type')}</Label>
        <select
          id="individual"
          value={individual ? 'individual' : 'business'}
          onChange={e => setIndividual(e.target.value === 'individual')}
          style={{ padding: '0.5rem', borderRadius: '4px', border: `1px solid ${colors.border}` }}
        >
          <option value="individual">{t('customer.individual')}</option>
          <option value="business">{t('customer.business')}</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="email">{t('auth.email')}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); clearFieldError('email'); }}
          onBlur={e => validateField('email', e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="phone">{t('customer.phone')}</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => { setPhone(e.target.value); clearFieldError('phone'); }}
          onBlur={e => validateField('phone', e.target.value)}
          error={fieldErrors.phone}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="address">{t('customer.address')}</Label>
        <Input
          id="address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? t('customer.adding') : t('customer.add')}
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
