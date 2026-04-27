import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

type TextSize = 'large' | 'normal' | 'small';

interface TextProps {
  size?: TextSize;
  children: ReactNode;
  ellipsis?: boolean;
  type?: 'primary' | 'secondary' | 'error';
  color?: string;
}

const sizeMap: Record<TextSize, keyof typeof typography> = {
  large: 'large',
  normal: 'body',
  small: 'small',
};

export default function Text({ size = 'normal', children, type = 'primary', ellipsis = false, color }: TextProps) {
  const token = typography[sizeMap[size]] as { fontSize: string; fontWeight: number };

  const style: CSSProperties = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    color: color ?? (type === 'primary' ? colors.textPrimary : type === 'secondary' ? colors.textSecondary : colors.error),
    whiteSpace: ellipsis ? 'nowrap' : undefined,
    overflow: ellipsis ? 'hidden' : undefined,
    textOverflow: ellipsis ? 'ellipsis' : undefined,
  };

  return <p style={style}>{children}</p>;
}
