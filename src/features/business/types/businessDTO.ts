import type { CreateUserInputDTO } from '../../user/types/userDTO';

export type BusinessDTO = {
  id: string;
  name: string;
  businessId: string;
};

export type CreateBusinessInputDTO = Omit<BusinessDTO, "id">;

export type CreateBusinessWithAdminInputDTO = CreateBusinessInputDTO & {
  adminUser: Omit<CreateUserInputDTO, "role">;
};

export type UpdateBusinessInputDTO = Partial<CreateBusinessInputDTO>;

export type BusinessPublicDetailsDTO = Pick<BusinessDTO, "id" | "name">;
