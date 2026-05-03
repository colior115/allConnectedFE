import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Select, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { CreateEmployeeInput, Employee, EmploymentStatus } from '../types/employee';
import type { Gender } from '@colior115/all-connected-be-sdk';

export interface AddEmployeeFormProps {
  businessId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface AddEmployeeFormInternalProps extends AddEmployeeFormProps {
  canAddNewUser: (email: string) => Promise<boolean>;
  createEmployee: (data: CreateEmployeeInput) => Promise<Employee>;
}

interface FieldErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\s'-]{2,}$/u;
const PHONE_RE = /^\+?[\d\s\-().]{7,}$/;

function validateFields(
  values: { email: string; firstName: string; lastName: string; phone: string },
  t: (key: string) => string,
): FieldErrors {
  const errors: FieldErrors = {};
  if (!EMAIL_RE.test(values.email)) errors.email = t('validation.invalidEmail');
  if (!NAME_RE.test(values.firstName)) errors.firstName = t('validation.invalidName');
  if (!NAME_RE.test(values.lastName)) errors.lastName = t('validation.invalidName');
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = t('validation.invalidPhone');
  return errors;
}

export function AddEmployeeForm({
  businessId,
  canAddNewUser,
  createEmployee,
  onSuccess,
  onCancel,
}: AddEmployeeFormInternalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [hireDate, setHireDate] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>('active');
  const [terminationDate, setTerminationDate] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validateField = (field: keyof FieldErrors, value: string) => {
    const errors = validateFields({ email, firstName, lastName, phone, [field]: value }, t);
    setFieldErrors(prev => ({ ...prev, [field]: errors[field] }));
  };

  const clearFieldError = (field: keyof FieldErrors) =>
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const errors = validateFields({ email, firstName, lastName, phone }, t);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const canAdd = await canAddNewUser(email);
      if (!canAdd) {
        setFieldErrors(prev => ({ ...prev, email: t('user.emailAlreadyExists') }));
        return;
      }
      await createEmployee({
        businessId,
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        employeeId,
        gender,
        hireDate,
        employmentStatus,
        terminationDate: employmentStatus === 'terminated' ? terminationDate : undefined,
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
        <Label htmlFor="firstName">{t('user.firstName')}</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => { setFirstName(e.target.value); clearFieldError('firstName'); }}
          onBlur={e => validateField('firstName', e.target.value)}
          error={fieldErrors.firstName}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="lastName">{t('user.lastName')}</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={e => { setLastName(e.target.value); clearFieldError('lastName'); }}
          onBlur={e => validateField('lastName', e.target.value)}
          error={fieldErrors.lastName}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="phone">{t('employee.phone')}</Label>
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
        <Label htmlFor="employeeId">{t('employee.employeeId')}</Label>
        <Input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={e => setEmployeeId(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="gender">{t('employee.gender')}</Label>
        <Select id="gender" value={gender} onChange={e => setGender(e.target.value as Gender)} required>
          <option value="male">{t('employee.gender_male')}</option>
          <option value="female">{t('employee.gender_female')}</option>
          <option value="other">{t('employee.gender_other')}</option>
          <option value="prefer_not_to_say">{t('employee.gender_prefer_not_to_say')}</option>
        </Select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="hireDate">{t('employee.hireDate')}</Label>
        <Input id="hireDate" type="date" value={hireDate} onChange={e => setHireDate(e.target.value)} required />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="employmentStatus">{t('employee.employmentStatus')}</Label>
        <Select id="employmentStatus" value={employmentStatus} onChange={e => setEmploymentStatus(e.target.value as EmploymentStatus)} required>
          <option value="active">{t('employee.status_active')}</option>
          <option value="inactive">{t('employee.status_inactive')}</option>
          <option value="terminated">{t('employee.status_terminated')}</option>
          <option value="on_leave">{t('employee.status_on_leave')}</option>
        </Select>
      </div>

      {employmentStatus === 'terminated' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Label htmlFor="terminationDate">{t('employee.terminationDate')}</Label>
          <Input id="terminationDate" type="date" value={terminationDate} onChange={e => setTerminationDate(e.target.value)} required />
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? t('employee.adding') : t('employee.add')}
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
