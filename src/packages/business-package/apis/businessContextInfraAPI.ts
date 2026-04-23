import type { SlotKey } from 'repluggable';
import type { UserRole, UserBusinessRelationType } from '../types/business';

export const BusinessContextInfraAPI: SlotKey<BusinessContextInfraAPI> = {
  name: 'Business Context Infra API',
  public: true,
  layer: 'INFRA',
};

export interface BusinessContextValue {
  businessId: string;
  role: UserRole;
  type: UserBusinessRelationType;
  token: string;
}

export interface BusinessContextInfraAPI {
  setBusinessContext(context: BusinessContextValue): void;
  clearBusinessContext(): void;
  registerSetter(setter: (context: BusinessContextValue | null) => void): void;
}
