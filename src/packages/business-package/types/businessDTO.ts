export interface BusinessDTO {
  id: string;
  name: string;
  businessId: string;
}

export type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;
