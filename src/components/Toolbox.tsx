import debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import Button from './Button';

interface ToolboxProps {
  searchPlaceholder: string;
  addButtonLabel: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
  debounceMs?: number;
}

export function Toolbox({ searchPlaceholder, addButtonLabel, onSearch, onAdd, debounceMs = 300 }: ToolboxProps) {
  const [value, setValue] = useState('');
  const debouncedSearch = useMemo(() => debounce(onSearch, debounceMs), [onSearch, debounceMs]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ flex: 1, width: '100%' }}>
        <SearchBar
          placeholder={searchPlaceholder}
          value={value}
          onChange={e => { setValue(e.target.value); debouncedSearch(e.target.value); }}
        />
      </div>
      <Button onClick={onAdd}>{addButtonLabel}</Button>
    </div>
  );
}
