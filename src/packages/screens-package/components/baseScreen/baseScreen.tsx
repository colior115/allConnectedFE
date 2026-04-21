import { type ReactNode } from 'react';
import { colors } from '../../../../styles/theme/colors';
import { typography } from '../../../../styles/theme/typography';

interface BaseScreenProps {
  children: ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

export function BaseScreen({ children, title, style }: BaseScreenProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
      {title && (
        <header style={{ paddingBlock: '16px', paddingInline: '24px', borderBottom: `1px solid ${colors.border}` }}>
          <h1 style={{ margin: 0, ...typography.h3, fontFamily: typography.fontFamily, color: colors.textPrimary }}>{title}</h1>
        </header>
      )}
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}
