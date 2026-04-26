import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../../../../components';
import { colors } from '../../../../styles/theme/colors';
import { typography } from '../../../../styles/theme/typography';
import type { Navigation } from '../../types/navigation';

interface BaseScreenProps {
  children: ReactNode;
  titleKey?: string;
  navigation?: Navigation;
}

function BackButton({ navigation }: { navigation: Navigation }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  if (!navigation.canGoBack()) return null;

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

export function BaseScreen({ children, titleKey, navigation }: BaseScreenProps) {
  const { t } = useTranslation();
  const title = titleKey ? t(titleKey) : undefined;
  const showHeader = title || (navigation && navigation.canGoBack());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {showHeader && (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBlock: '16px',
          paddingInline: '24px',
          borderBottom: `1px solid ${colors.border}`,
        }}>
          {navigation && <BackButton navigation={navigation} />}
          {title && (
            <h1 style={{ margin: 0, ...typography.h3, fontFamily: typography.fontFamily, color: colors.textPrimary }}>
              {title}
            </h1>
          )}
        </header>
      )}
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {children}
      </main>
    </div>
  );
}
