import type { SlotKey } from 'repluggable';
import type { Business, BusinessPublic, UserBusinessRelation } from '../types/business';

export const BusinessDataServiceAPI: SlotKey<BusinessDataServiceAPI> = {
  name: 'Business Data Service API',
  public: true,
  layer: 'DATA_SERVICE',
};

export interface BusinessDataServiceAPI {
  getPublicDetails(id: string): Promise<BusinessPublic>;
  getAll(): Promise<Business[]>;
  getById(id: string): Promise<Business>;
  getUserBusinesses(userEmail: string): Promise<UserBusinessRelation[]>;
  connectToBusiness(id: string): Promise<string>;
  create(name: string, businessId: string): Promise<Business>;
  update(id: string, name: string): Promise<Business>;
  delete(id: string): Promise<Business>;
}
