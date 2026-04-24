import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

type TextSize = 'large' | 'normal' | 'small';

interface TextProps {
  size?: TextSize;
  children: ReactNode;
  color?: string;
}

const sizeMap: Record<TextSize, keyof typeof typography> = {
  large: 'large',
  normal: 'body',
  small: 'small',
};

export default function Text({ size = 'normal', children, color }: TextProps) {
  const token = typography[sizeMap[size]] as { fontSize: string; fontWeight: number };

  const style: CSSProperties = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    color: color ?? colors.textSecondary,
  };

  return <p style={style}>{children}</p>;
}
