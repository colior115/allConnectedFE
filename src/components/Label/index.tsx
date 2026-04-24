import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
}

export default function Label({ htmlFor, children }: LabelProps) {
  const style: CSSProperties = {
    fontFamily: typography.fontFamily,
    fontSize: typography.small.fontSize,
    fontWeight: 500,
    color: colors.textPrimary,
  };

  return <label htmlFor={htmlFor} style={style}>{children}</label>;
}
