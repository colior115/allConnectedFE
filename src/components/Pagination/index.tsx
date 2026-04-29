import { useTranslation } from 'react-i18next';
import { colors } from '../../styles/theme/colors';
import { typography } from '../../styles/theme/typography';
import IconButton from '../IconButton';

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

function ChevronIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d={direction === 'prev' ? 'M12.5 15L7.5 10L12.5 5' : 'M7.5 5L12.5 10L7.5 15'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pagination({ page, total, limit, onChange }: PaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        paddingBlock: '0.75rem',
        borderBlockStart: `1px solid ${colors.border}`,
      }}
    >
      <IconButton
        icon={<ChevronIcon direction="prev" />}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t('pagination.prev')}
      />
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.small.fontSize,
          color: colors.textSecondary,
          minWidth: '6rem',
          textAlign: 'center',
        }}
      >
        {page} {t('pagination.of')} {totalPages}
      </span>
      <IconButton
        icon={<ChevronIcon direction="next" />}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={t('pagination.next')}
      />
    </div>
  );
}
