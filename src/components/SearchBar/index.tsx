import { useState, type CSSProperties, type InputHTMLAttributes } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'type'> {}

export default function SearchBar(props: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  const style: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
    padding: '0.5rem 0.75rem 0.5rem 2.25rem',
    border: `1px solid ${focused ? colors.primary : colors.border}`,
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: focused ? `0 0 0 2px ${colors.primary}33` : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    background: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='9' cy='9' r='6' stroke='%23${colors.textSecondary.replace('#', '')}' stroke-width='1.5'/%3E%3Cpath d='M13.5 13.5L17 17' stroke='%23${colors.textSecondary.replace('#', '')}' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat 0.6rem center`,
  };

  return (
    <input
      type="search"
      style={style}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      {...props}
    />
  );
}
