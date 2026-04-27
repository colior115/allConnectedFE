import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Title } from '../../../../components';
import { colors } from '../../../../styles/theme/colors';
import type { Navigation } from '../../types/navigation';
import type { SidebarHeaderComponent, SidebarItem } from '../../apis/screensInfraAPI';
import { Sidebar } from '../sidebar/sidebar';

export interface BaseScreenProps {
  children: ReactNode;
  titleKey?: string;
  navigation?: Navigation;
  goToPrevDisabled?: boolean;
  sidebarItems?: SidebarItem[];
  sidebarHeader?: SidebarHeaderComponent;
}

function BackButton({ navigation, goToPrevDisabled }: { navigation: Navigation; goToPrevDisabled?: boolean }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  if (!navigation.canGoBack() || goToPrevDisabled) return null;

  return (
    <IconButton
      onClick={navigation.goBack}
      aria-label="Go back"
      icon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ transform: isRtl ? 'scaleX(-1)' : undefined }}
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
}

export function BaseScreen({ children, titleKey, navigation, sidebarItems, sidebarHeader, goToPrevDisabled }: BaseScreenProps) {
  const { t } = useTranslation();
  const title = titleKey ? t(titleKey) : undefined;
  const showHeader = title || (goToPrevDisabled && navigation && navigation.canGoBack());
  const showSidebar = sidebarItems && sidebarItems.length > 0 && navigation;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'hidden' }}>
      {showSidebar && <Sidebar items={sidebarItems} navigation={navigation} header={sidebarHeader} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {showHeader && (
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingBlock: '16px',
              paddingInline: '24px',
              borderBottom: `1px solid ${colors.border}`,
              flexShrink: 0,
            }}
          >
            {!goToPrevDisabled && navigation && <BackButton navigation={navigation} />}
            {title && (
              <Title size="small">
                {title}
              </Title>
            )}
          </header>
        )}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>{children}</main>
      </div>
    </div>
  );
}
