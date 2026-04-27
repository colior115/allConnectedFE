import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../styles/theme/colors';
import { typography } from '../../../../styles/theme/typography';
import type { Navigation } from '../../types/navigation';
import type { SidebarHeaderComponent, SidebarItem } from '../../apis/screensInfraAPI';

const COLLAPSED_WIDTH = 56;
const EXPANDED_WIDTH = 200;

interface SidebarProps {
  items: SidebarItem[];
  navigation: Navigation;
  header?: SidebarHeaderComponent;
}

function CollapseIcon({ flipped }: { flipped: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar({ items, navigation, header: Header }: SidebarProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('sidebar-collapsed') === 'true',
  );

  const toggle = () => {
    setCollapsed(c => {
      const next = !c;
      localStorage.setItem('sidebar-collapsed', String(next));
      return next;
    });
  };

  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <div style={{ position: 'relative', flexShrink: 0, display: 'flex' }}>
      <aside
        style={{
          width,
          minWidth: width,
          display: 'flex',
          flexDirection: 'column',
          borderInlineEnd: `1px solid ${colors.border}`,
          background: '#fff',
          transition: 'width 0.2s ease, min-width 0.2s ease',
          overflow: 'hidden',
          height: '100vh',
        }}
      >
        {/* Spacer so content doesn't sit under the floating toggle */}
        <div style={{ height: '52px', flexShrink: 0, position: "absolute" }} />

        {Header && (
          <div
            style={{
              paddingInline: collapsed ? '10px' : '14px',
              paddingBlock: '12px',
              borderBottom: `1px solid ${colors.border}`,
              height: '40px',
            }}
          >
            <Header collapsed={collapsed} />
          </div>
        )}

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBlock: '8px' }}>
          {items.map(item => {
            const isActive = navigation.currentScreen === item.screenName;
            const {Icon} = item;
            return (
              <button
                key={item.screenName}
                onClick={() => navigation.navigate(item.screenName)}
                style={{
                  display: 'flex',
                  height: '40px',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: '10px',
                  paddingBlock: '10px',
                  paddingInline: collapsed ? 0 : '14px',
                  border: 'none',
                  borderInlineStart: `3px solid ${isActive ? colors.primary : 'transparent'}`,
                  background: isActive ? 'rgba(79, 70, 229, 0.06)' : 'transparent',
                  cursor: 'pointer',
                  color: isActive ? colors.primary : colors.textSecondary,
                  fontSize: typography.small.fontSize,
                  fontWeight: isActive ? 500 : 400,
                  fontFamily: typography.fontFamily,
                  whiteSpace: 'nowrap',
                  width: '100%',
                  textAlign: 'start',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{ flexShrink: 0, display: 'inline-flex', width: '20px', height: '20px' }}
                >
                <Icon/>
                </span>
                {!collapsed && <span>{t(item.titleKey)}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <button
        onClick={toggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          position: 'absolute',
          top: '8px',
          insetInlineEnd: '-16px',
          zIndex: 10,
          width: '17px',
          height: '40px',
          borderRadius: '0px 10px 10px 0px',
          background: '#fff',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: colors.textSecondary,
          padding: 0,
          flexShrink: 0,
        }}
      >
        <CollapseIcon flipped={collapsed !== isRtl} />
      </button>
    </div>
  );
}
