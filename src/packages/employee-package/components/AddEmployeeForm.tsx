import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Select, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';
import type { User } from '../../user-package';
import type { UpdateUserInputDTO } from '../../user-package';
import type { Employee, SalaryType } from '../types/employee';
import type { CreateEmployeeInputDTO } from '../types/employeeDTO';

export interface AddEmployeeFormProps {
  businessId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface AddEmployeeFormInternalProps extends AddEmployeeFormProps {
  canAddNewUser: (email: string) => Promise<boolean>;
  createUser: (data: UpdateUserInputDTO) => Promise<User>;
  createEmployee: (businessId: string, userEmail: string, data: CreateEmployeeInputDTO) => Promise<Employee>;
}

export function AddEmployeeForm({
  businessId,
  canAddNewUser,
  createUser,
  createEmployee,
  onSuccess,
  onCancel,
}: AddEmployeeFormInternalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [salaryType, setSalaryType] = useState<SalaryType>('monthly');
  const [salaryValue, setSalaryValue] = useState('');
  const [currency, setCurrency] = useState('');
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
      const user = await createUser({ email, firstName, lastName });
      await createEmployee(businessId, user.email, {
        salaryType,
        salaryValue: Number(salaryValue),
        currency,
      });
      onSuccess?.();
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="salaryType">{t('employee.salaryType')}</Label>
        <Select
          id="salaryType"
          value={salaryType}
          onChange={e => setSalaryType(e.target.value as SalaryType)}
          required
        >
          <option value="hourly">{t('employee.hourly')}</option>
          <option value="monthly">{t('employee.monthly')}</option>
          <option value="annual">{t('employee.annual')}</option>
        </Select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="salaryValue">{t('employee.salaryValue')}</Label>
        <Input
          id="salaryValue"
          type="number"
          min="0"
          step="0.01"
          value={salaryValue}
          onChange={e => setSalaryValue(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="currency">{t('employee.currency')}</Label>
        <Input
          id="currency"
          type="text"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          required
        />
      </div>

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
