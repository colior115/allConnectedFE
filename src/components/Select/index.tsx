import { useState, type CSSProperties, type SelectHTMLAttributes } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';
import Text from '../Text';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  error?: string;
}

export default function Select({ error, children, ...props }: SelectProps) {
  const [focused, setFocused] = useState(false);

  const selectStyle: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textPrimary,
    padding: '0.5rem 0.75rem',
    border: `1px solid ${error ? colors.error : focused ? colors.primary : colors.textSecondary}`,
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: focused ? `0 0 0 2px ${colors.primary}33` : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: colors.background,
    cursor: 'pointer',
  };

  return (
    <div>
      <select
        style={selectStyle}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        {...props}
      >
        {children}
      </select>
      {error && <Text size="small" color={colors.error}>{error}</Text>}
    </div>
  );
}
