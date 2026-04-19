import { useState, type CSSProperties, type InputHTMLAttributes } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  const baseStyle: CSSProperties = {
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
    ...style,
  };

  return (
    <div>
      <input
        style={baseStyle}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        {...props}
      />
      {error && (
        <p style={{
          margin: '4px 0 0',
          fontSize: typography.small.fontSize,
          color: colors.error,
          fontFamily: typography.fontFamily,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
