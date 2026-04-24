import type { CSSProperties } from 'react';
import Title from '../Title';
import Text from '../Text';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  const containerStyle: CSSProperties = {
    textAlign: 'center',
    marginBlockStart: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  };

  return (
    <div style={containerStyle}>
      <Title size="large">{title}</Title>
      {description && <Text size="large">{description}</Text>}
    </div>
  );
}
