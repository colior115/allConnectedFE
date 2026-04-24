import { type ButtonHTMLAttributes, type CSSProperties } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: 'primary' | 'ghost';
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const base: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: '6px',
    transition: 'opacity 0.2s',
    opacity: props.disabled ? 0.6 : 1,
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      paddingBlock: '0.6rem',
      paddingInline: '1rem',
      background: colors.primary,
      color: '#fff',
    },
    ghost: {
      padding: 0,
      background: 'none',
      color: colors.primary,
      fontWeight: 500,
      textDecoration: 'none',
    },
  };

  return (
    <button style={{ ...base, ...variants[variant] }} {...props}>
      {children}
    </button>
  );
}
