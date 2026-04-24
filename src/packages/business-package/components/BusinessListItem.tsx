import type { CSSProperties } from 'react';
import { Title, Text } from '../../../components';
import { colors } from '../../../styles/theme/colors';

interface BusinessListItemProps {
  name: string;
  role: string;
  onClick: () => void;
}

const buttonStyle: CSSProperties = {
  width: '100%',
  textAlign: 'start',
  paddingBlock: '1rem',
  paddingInline: '1.25rem',
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  background: '#fff',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

export function BusinessListItem({ name, role, onClick }: BusinessListItemProps) {
  return (
    <button style={buttonStyle} onClick={onClick}>
      <Title size="small">{name}</Title>
      <Text size="small">{role}</Text>
    </button>
  );
}
