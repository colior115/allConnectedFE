import { type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  icon: ReactNode;
}

const buttonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.25rem',
  borderRadius: '6px',
  color: colors.textPrimary,
  transition: 'background-color 0.15s',
  lineHeight: 0,
};

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <button
      style={{ ...buttonStyle, cursor: props.disabled ? 'not-allowed' : 'pointer', opacity: props.disabled ? 0.6 : 1 }}
      onMouseEnter={e => { if (!props.disabled) e.currentTarget.style.backgroundColor = colors.border; props.onMouseEnter?.(e); }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; props.onMouseLeave?.(e); }}
      {...props}
    >
      {icon}
    </button>
  );
}
