import React from 'react';
import type { Shell, SlotKey } from 'repluggable';
import { BaseScreen, type BaseScreenProps } from '../components/baseScreen/baseScreen';
import type { BaseScreenComponent, ContributedScreen, ScreenGuardComponent, ScreensInfraAPI, SidebarHeaderComponent, SidebarItem } from './screensInfraAPI';

export const screensSlotKey: SlotKey<ContributedScreen> = {
  name: 'contributedScreen',
};

export const initScreenSlotKey: SlotKey<string> = {
  name: 'contributedInitialScreen',
};

export const sideBarItemSlotKey: SlotKey<SidebarItem> = {
  name: 'contributedSidebarItem',
};

export const createScreensInfraAPI = (shell: Shell): ScreensInfraAPI => {
  const componentsSlot = shell.declareSlot(screensSlotKey);
  const initScreenSlot = shell.declareSlot(initScreenSlotKey);
  let screenGuard: ScreenGuardComponent | undefined;
  let sidebarHeader: SidebarHeaderComponent | undefined;

  const sidebarItemsSlot = shell.declareSlot(sideBarItemSlotKey);

  const BoundBaseScreen: BaseScreenComponent = (props) =>
    React.createElement(BaseScreen, { ...props, sidebarItems: [...sidebarItemsSlot.getItems()].map(item => item.contribution).sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
      sidebarHeader } as BaseScreenProps);

  return {
    components: {
      BaseScreen: BoundBaseScreen,
    },

    contributeSidebarItem(_fromShell, item) {
      sidebarItemsSlot.contribute(_fromShell, item);
    },

    setSidebarHeader(component) {
      sidebarHeader = component;
    },

    setScreenGuard(guard) {
      screenGuard = guard;
    },

    getScreenGuard() {
      return screenGuard;
    },

    contributeScreen(fromShell, contribution, definedAsInitial = false) {
      if (definedAsInitial) {
        const isInitialScreenExist = initScreenSlot.getItems().length > 0;
        if (isInitialScreenExist) {
          throw new Error('There are more than 1 initial screens');
        }
        initScreenSlot.contribute(fromShell, contribution.name);
      }

      const isScreenNameExist = !!componentsSlot
        .getItems()
        .find(item => item.contribution.name === contribution.name);

      if (isScreenNameExist) {
        throw new Error(
          `There are more than 1 screens with name: ${contribution.name}`,
        );
      }
      componentsSlot.contribute(fromShell, contribution);
    },

    getScreens: () => {
      const screens = componentsSlot.getItems().map(item => item.contribution);
      return screens;
    },

    getInitialScreen: () => {
      const initialScreenName = initScreenSlot.getSingleItem()?.contribution;
      return initialScreenName;
    },
  };
};
