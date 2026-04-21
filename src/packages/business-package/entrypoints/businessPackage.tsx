import type { EntryPoint } from 'repluggable';
import { MainViewInfraAPI } from '../../main-view-package';
import { BusinessInfraAPI } from '../apis/businessInfraAPI';
import { createBusinessInfraAPI } from '../apis/createBusinessInfraAPI';

export const BusinessPackage: EntryPoint[] = [
  {
    name: 'BUSINESS_PACKAGE',
    layer: 'INFRA',

    declareAPIs() {
      return [BusinessInfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(BusinessInfraAPI, () => createBusinessInfraAPI());
    },

    extend(_shell) {
      // TODO: contribute components, screens, providers
    },
  },
];
