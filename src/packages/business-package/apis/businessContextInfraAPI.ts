import type { SlotKey } from 'repluggable';
import type { UserRoleEnriched } from '../types/business';

export const BusinessContextInfraAPI: SlotKey<BusinessContextInfraAPI> = {
  name: 'Business Context Infra API',
  public: true,
  layer: 'INFRA',
};

export interface BusinessContextValue {
  businessId: string;
  name: string;
  role: UserRoleEnriched;
  token: string;
}

export interface BusinessContextInfraAPI {
  setBusinessContext(context: BusinessContextValue): void;
  clearBusinessContext(): void;
  registerSetter(setter: (context: BusinessContextValue | null) => void): void;
  getContext(): BusinessContextValue | null;
}
