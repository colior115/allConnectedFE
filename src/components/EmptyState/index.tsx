import type { CSSProperties } from 'react';
import Title from '../Title';
import Text from '../Text';

interface EmptyStateProps {
  title: string;
  description?: string;
  style?: CSSProperties;
  className?: string;
}

export default function EmptyState({ title, description, style, className }: EmptyStateProps) {
  const containerStyle: CSSProperties = {
    textAlign: 'center',
    marginTop: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  };

  return (
    <div style={{ ...containerStyle, ...style }} className={className}>
      <Title size="large">{title}</Title>
      {description && <Text size="large">{description}</Text>}
    </div>
  );
}
