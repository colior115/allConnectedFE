import type { createSdk } from '@colior115/all-connected-be-sdk';
import type { SlotKey } from 'repluggable';

export type AllConnectedServerSdkAPI = ReturnType<typeof createSdk>;

export const AllConnectedServerSdkAPI: SlotKey<AllConnectedServerSdkAPI> = {
  name: 'AllConnected Server SDK API',
  public: true,
  layer: 'INFRA',
};
