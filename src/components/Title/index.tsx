import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';

type TitleSize = 'large' | 'medium' | 'small';

interface TitleProps {
  size: TitleSize;
  children: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<TitleSize, { tag: 'h1' | 'h2' | 'h3'; typographyKey: keyof typeof typography }> = {
  large: { tag: 'h1', typographyKey: 'h1' },
  medium: { tag: 'h2', typographyKey: 'h2' },
  small: { tag: 'h3', typographyKey: 'h3' },
};

export default function Title({ size, children, color, className, style }: TitleProps) {
  const { tag: Tag, typographyKey } = sizeMap[size];
  const token = typography[typographyKey] as { fontSize: string; fontWeight: number };

  const baseStyle: CSSProperties = {
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: token.fontSize,
    fontWeight: token.fontWeight,
    color: color ?? colors.textPrimary,
  };

  return (
    <Tag className={className} style={{ ...baseStyle, ...style }}>
      {children}
    </Tag>
  );
}
