import debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SearchBar } from '../../../components';
import type { Navigation } from '../../screens-package';
const DEBOUNCE_MS = 300;
interface EmployeesToolboxProps {
  navigation: Navigation;
  onSearch: (value: string) => void;
}

export function EmployeesToolbox({ navigation, onSearch }: EmployeesToolboxProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const debouncedSearch = useMemo(() => debounce(onSearch, DEBOUNCE_MS), [onSearch]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ flex: 1, width: '100%' }}>
        <SearchBar
          placeholder={t('employee.searchPlaceholder')}
          value={value}
          onChange={e => { setValue(e.target.value); debouncedSearch(e.target.value); }}
        />
      </div>
      <Button onClick={() => navigation.navigate('AddEmployee')}>{t('dashboard.addEmployee')}</Button>
    </div>
  );
}
