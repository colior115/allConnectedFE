import { type ReactNode } from 'react';

interface BaseScreenProps {
  children: ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

export function BaseScreen({ children, title, style }: BaseScreenProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
      {title && (
        <header style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{title}</h1>
        </header>
      )}
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}
