import type { Shell, SlotKey } from 'repluggable';
import { BaseScreen } from '../components/baseScreen/baseScreen';
import type { Navigation } from '../types/navigation';
import type { ReactNode } from 'react';

export const ScreensInfraAPI: SlotKey<ScreensInfraAPI> = {
  name: 'Screens Infra API',
  public: true,
  layer: 'INFRA',
};

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
}

export interface ContributedScreen {
  name: string;
  screen: (props: ScreenWithNavigationProps) => ReactNode;
}

export type MainScreenWithNavigationProps = {
  getInitialScreen: () => string | undefined;
  getScreens: () => ContributedScreen[];
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
