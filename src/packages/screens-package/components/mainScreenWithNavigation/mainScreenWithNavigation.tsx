import { useState, useCallback, useMemo } from 'react';
import type { Navigation } from '../../types/navigation';
import type { MainScreenWithNavigationProps, ScreenGuardComponent } from '../../apis/screensInfraAPI';

const PassThrough: ScreenGuardComponent = ({ children }) => <>{children}</>;

export function MainScreenWithNavigation({ getInitialScreen, getScreens, getScreenGuard }: MainScreenWithNavigationProps) {
  const screens = getScreens();
  const initialScreen = getInitialScreen() ?? screens[0]?.name;

  const [stack, setStack] = useState<string[]>(initialScreen ? [initialScreen] : []);

  const currentName = stack[stack.length - 1];
  const currentScreen = screens.find(s => s.name === currentName);

  const navigate = useCallback((screenName: string) => {
    setStack(prev => [...prev, screenName]);
  }, []);

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const canGoBack = useCallback(() => stack.length > 1, [stack.length]);

  const navigation: Navigation = useMemo(
    () => ({ navigate, goBack, canGoBack, currentScreen: currentName }),
    [navigate, goBack, canGoBack, currentName],
  );

  if (!currentScreen) return null;

  const isProtected = currentScreen.protected !== false;
  const Guard = isProtected ? (getScreenGuard() ?? PassThrough) : PassThrough;

  return <Guard navigate={navigate}>{currentScreen.screen({ navigation })}</Guard>;
}
