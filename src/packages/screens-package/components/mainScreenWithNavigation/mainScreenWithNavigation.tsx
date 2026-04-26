import { useState, useCallback, useMemo } from 'react';
import type { Navigation } from '../../types/navigation';
import type { MainScreenWithNavigationProps, ScreenGuardComponent } from '../../apis/screensInfraAPI';

const PassThrough: ScreenGuardComponent = ({ children }) => <>{children}</>;

type StackEntry = { name: string; state?: unknown };

export function MainScreenWithNavigation({ getInitialScreen, getScreens, getScreenGuard }: MainScreenWithNavigationProps) {
  const screens = getScreens();
  const initialScreen = getInitialScreen() ?? screens[0]?.name;

  const [stack, setStack] = useState<StackEntry[]>(initialScreen ? [{ name: initialScreen }] : []);

  const currentEntry = stack[stack.length - 1];
  const currentName = currentEntry?.name;
  const currentScreen = screens.find(s => s.name === currentName);

  const navigate = useCallback((screenName: string, state?: unknown) => {
    setStack(prev => [...prev, { name: screenName, state }]);
  }, []);

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const canGoBack = useCallback(() => stack.length > 1, [stack.length]);

  const getState = useCallback(() => currentEntry?.state, [currentEntry]);

  const navigation: Navigation = useMemo(
    () => ({ navigate, goBack, canGoBack, currentScreen: currentName, getState }),
    [navigate, goBack, canGoBack, currentName, getState],
  );

  if (!currentScreen) return null;

  const isProtected = currentScreen.protected !== false;
  const Guard = isProtected ? (getScreenGuard() ?? PassThrough) : PassThrough;

  return <Guard navigate={navigate}>{currentScreen.screen({ navigation })}</Guard>;
}
