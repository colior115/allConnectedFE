import type { Shell, SlotKey } from 'repluggable';
import type { Navigation } from '../types/navigation';
import type { ComponentType, ReactNode } from 'react';

export const ScreensInfraAPI: SlotKey<ScreensInfraAPI> = {
  name: 'Screens Infra API',
  public: true,
  layer: 'INFRA',
};

export interface SidebarItem {
  screenName: string;
  titleKey: string;
  Icon: ComponentType;
  order?: number;
}

export type BaseScreenComponent = (props: {
  children: ReactNode;
  titleKey?: string;
  navigation?: Navigation;
  goToPrevDisabled?: boolean;
}) => ReactNode;

export type ScreenGuardProps = {
  navigate: (screen: string) => void;
  children: ReactNode;
};

export type ScreenGuardComponent = (props: ScreenGuardProps) => ReactNode;

export type SidebarHeaderComponent = (props: { collapsed: boolean }) => ReactNode;

export interface ScreensInfraAPI {
  components: {
    BaseScreen: BaseScreenComponent;
  };
  contributeScreen: (
    fromShell: Shell,
    contribution: ContributedScreen,
    definedAsInitial?: boolean,
  ) => void;
  contributeSidebarItem: (fromShell: Shell, item: SidebarItem) => void;
  setSidebarHeader: (component: SidebarHeaderComponent) => void;
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
