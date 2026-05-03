import type { EntryPoint } from 'repluggable';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import { MainViewInfraAPI } from '../../main-view-package';
import { I18nInfraAPI } from '../apis/i18nInfraAPI';
import { createI18nInfraAPI } from '../apis/createI18nInfraAPI';

export const I18nPackage: EntryPoint[] = [
  {
    name: 'I18N_PACKAGE',
    layer: 'INFRA',

    declareAPIs() {
      return [I18nInfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(I18nInfraAPI, () => createI18nInfraAPI(shell));
    },

    extend(shell) {
      const mainViewAPI = shell.getAPI(MainViewInfraAPI);
      mainViewAPI.contributeProvider(shell, {
        provider: (children) => (
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        ),
      });
    },
  },
];
