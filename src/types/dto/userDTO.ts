export type UserDTO = {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleDTO;
};

export type UserRoleDTO = "admin" | "user" | "owner";

export type CreateUserInputDTO = Omit<UserDTO, "id" | "businessId">;

export type UpdateUserInputDTO = Partial<CreateUserInputDTO>;
