import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../styles/theme/colors';
import { typography } from '../styles/theme/typography';
import Loader from './Loader';
import Pagination from './Pagination';
import Text from './Text';

export interface ColumnDef<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

interface EntityTableProps<T extends { id: string }> {
  columns: ColumnDef<T>[];
  items: T[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
}

const thStyle: CSSProperties = {
  textAlign: 'start',
  padding: '0.625rem 1rem',
  fontFamily: typography.fontFamily,
  fontSize: typography.small.fontSize,
  fontWeight: 600,
  color: colors.textSecondary,
  borderBlockEnd: `1px solid ${colors.border}`,
  whiteSpace: 'nowrap',
};

const tdStyle: CSSProperties = {
  padding: '0.75rem 1rem',
  fontFamily: typography.fontFamily,
  fontSize: typography.body.fontSize,
  color: colors.textPrimary,
  borderBlockEnd: `1px solid ${colors.border}`,
};

export function EntityTable<T extends { id: string }>({
  columns,
  items,
  total,
  page,
  limit,
  loading,
  error,
  emptyMessage,
  onPageChange,
  onRowClick,
}: EntityTableProps<T>) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '3rem' }}>
        <Loader />
      </div>
    );
  }

  if (error) return <Text color={colors.error}>{error}</Text>;

  if (items.length === 0) return <Text color={colors.textSecondary}>{emptyMessage}</Text>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={thStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              onMouseEnter={e => { if (onRowClick) e.currentTarget.style.backgroundColor = colors.background; }}
              onMouseLeave={e => { if (onRowClick) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {columns.map(col => (
                <td key={col.key} style={tdStyle}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} total={total} limit={limit} onChange={onPageChange} />
    </div>
  );
}
