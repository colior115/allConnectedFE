export type Business = {
  id: string;
  name: string;
  businessId: string;
};

export type BusinessPublicDetails = Pick<Business, 'id' | 'name'>;

export type CreateBusinessInput = Omit<Business, 'id'>;

export type UpdateBusinessInput = Partial<CreateBusinessInput>;
