import type { Shell, SlotKey } from 'repluggable';
import { BaseScreen } from '../components/baseScreen/baseScreen';
import type { ContributedScreen, ScreensInfraAPI } from './screensInfraAPI';

export const screensSlotKey: SlotKey<ContributedScreen> = {
  name: 'contributedScreen',
};

export const initScreenSlotKey: SlotKey<string> = {
  name: 'contributedInitialScreen',
};

export const createScreensInfraAPI = (shell: Shell): ScreensInfraAPI => {
  const componentsSlot = shell.declareSlot(screensSlotKey);
  const initScreenSlot = shell.declareSlot(initScreenSlotKey);

  return {
    components: {
      BaseScreen,
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
