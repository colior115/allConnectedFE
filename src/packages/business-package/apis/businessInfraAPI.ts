import type { SlotKey } from 'repluggable';

export const BusinessInfraAPI: SlotKey<BusinessInfraAPI> = {
  name: 'Business Infra API',
  public: true,
  layer: 'INFRA',
};

export interface BusinessInfraAPI {
  // TODO: define API methods
}
