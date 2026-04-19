import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Label({ htmlFor, children, className, style }: LabelProps) {
  const baseStyle: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.small.fontSize,
    fontWeight: 500,
    color: colors.textPrimary,
  };

  return (
    <label htmlFor={htmlFor} className={className} style={{ ...baseStyle, ...style }}>
      {children}
    </label>
  );
}
