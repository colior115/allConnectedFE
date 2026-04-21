import type { Shell, SlotKey } from 'repluggable';
import { BaseScreen } from '../components/baseScreen/baseScreen';
import type { Navigation } from '../types/navigation';
import type { ReactNode } from 'react';

export const ScreensInfraAPI: SlotKey<ScreensInfraAPI> = {
  name: 'Screens Infra API',
  public: true,
  layer: 'INFRA',
};

export type ScreenGuardProps = {
  navigate: (screen: string) => void;
  children: ReactNode;
};

export type ScreenGuardComponent = (props: ScreenGuardProps) => ReactNode;

export interface ScreensInfraAPI {
  components: {
    BaseScreen: typeof BaseScreen;
  };
  contributeScreen: (
    fromShell: Shell,
    contribution: ContributedScreen,
    definedAsInitial?: boolean,
  ) => void;
  getScreens: () => ContributedScreen[];
  getInitialScreen: () => string | undefined;
  setScreenGuard: (guard: ScreenGuardComponent) => void;
  getScreenGuard: () => ScreenGuardComponent | undefined;
}

export interface ContributedScreen {
  name: string;
  screen: (props: ScreenWithNavigationProps) => ReactNode;
  protected?: boolean;
}

export type MainScreenWithNavigationProps = {
  getInitialScreen: () => string | undefined;
  getScreens: () => ContributedScreen[];
  getScreenGuard: () => ScreenGuardComponent | undefined;
};

export type ScreenWithNavigationProps = {
  navigation: Navigation;
};

export type MainScreenWithNavigationScreenProps =
  MainScreenWithNavigationScreenStateProps;

export type MainScreenWithNavigationScreenStateProps = {
  initialScreen: string | undefined;
  screens: ContributedScreen[];
};
