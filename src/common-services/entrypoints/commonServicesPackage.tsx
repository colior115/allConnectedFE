import { createSdk } from '@colior115/all-connected-be-sdk';
import type { EntryPoint } from 'repluggable';
import { AllConnectedServerSdkAPI } from '../apis/allConnectedServerSdkAPI';
import { BusinessContextInfraAPI } from '../../packages/business-package';
import { supabase } from '../../utils/supabase';

export const CommonServicesPackage: EntryPoint[] = [
  {
    name: 'ALL_CONNECTED_SERVER_SDK',
    layer: 'INFRA',

    declareAPIs() {
      return [AllConnectedServerSdkAPI];
    },

    getDependencyAPIs() {
      return [BusinessContextInfraAPI];
    },

    attach(shell) {
      const businessContextAPI = shell.getAPI(BusinessContextInfraAPI);

      shell.contributeAPI(AllConnectedServerSdkAPI, () => createSdk({
        baseUrl: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000',
        getAuthToken: async () => {
          const { data } = await supabase.auth.getSession();
          return data.session?.access_token;
        },
        getBusinessToken: async () => businessContextAPI.getContext()?.token,
      }));
    },
  },
];
