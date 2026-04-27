import { useTranslation } from 'react-i18next';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { useBusinessContext } from '../context/BusinessContext';
import { Text } from '../../../components';

interface Props {
  collapsed: boolean;
}

export function BusinessSidebarHeader({ collapsed }: Props) {
  const { t } = useTranslation();
  const ctx = useBusinessContext();

  const initial = (ctx?.name ?? ctx?.businessId ?? '?')[0].toUpperCase();

  const avatar = (
    <div
      style={{
        width: 36,
        height: 36,
        minWidth: 36,
        borderRadius: '50%',
        background: colors.primary,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: typography.body.fontSize,
        fontWeight: 600,
        fontFamily: typography.fontFamily,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );

  if (collapsed) return avatar;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
      {avatar}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Text size="large" ellipsis>
          {ctx?.name}
        </Text>
        {ctx?.role && (
          <Text size="small" type="secondary" ellipsis>
            {t(`role.${ctx.role}`)}
          </Text>
        )}
      </div>
    </div>
  );
}
