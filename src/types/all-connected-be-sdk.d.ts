export type SdkConfig = {
  baseUrl: string;
  getAuthToken: () => Promise<string | undefined>;
  getBusinessToken: () => Promise<string | undefined>;
};

export declare class SdkError extends Error {
  status: number;
  constructor(status: number, message: string);
}

export type UserSystemRole = 'admin' | 'user';
export type AppArea = 'employees' | 'accounts' | 'customers';
export type PermissionLevel = 'EDIT' | 'VIEW' | 'NONE';
export type Permissions = { [K in AppArea]: PermissionLevel };
export type EmploymentStatus = 'active' | 'terminated' | 'on_leave';
export type Gender = 'male' | 'female' | 'other';

export type UserDTO = { id: string; firstName: string; lastName: string; email: string; role: UserSystemRole };
export type CreateUserInputDTO = Omit<UserDTO, 'id'>;
export type UpdateUserInputDTO = Partial<CreateUserInputDTO>;

export type BusinessDTO = { id: string; name: string; businessId: string };
export type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;
export type CreateBusinessInputDTO = Omit<BusinessDTO, 'id'>;
export type UpdateBusinessInputDTO = Partial<CreateBusinessInputDTO>;

export type EmployeeDTO = {
  id: string; businessId: string; firstName: string; lastName: string;
  gender: Gender; hireDate: string; employmentStatus: EmploymentStatus;
  employeeId: string; email?: string; phone?: string; terminationDate?: string;
};
export type EmployeeListItemDTO = { id: string; firstName: string; lastName: string; email?: string; employmentStatus: EmploymentStatus };
export type EmployeeListResponseDTO = { data: EmployeeListItemDTO[]; total: number; page: number; limit: number };
export type CreateEmployeeInputDTO = Omit<EmployeeDTO, 'id'>;
export type UpdateEmployeeInputDTO = Partial<CreateEmployeeInputDTO>;

export type UserRoleDTO = { id: string; businessId: string; roleName: string; permissions: Permissions };
export type CreateUserRoleInputDTO = Omit<UserRoleDTO, 'id'>;
export type UpdateUserRoleInputDTO = Partial<Omit<UserRoleDTO, 'id'>>;

export type BusinessRelationDTO = { id: string; userId: string; businessId: string; roleId: string };
export type CreateBusinessRelationInputDTO = Omit<BusinessRelationDTO, 'id'>;
export type UpdateBusinessRelationInputDTO = { roleId?: string };
export type BusinessRelationEnrichedDTO = { id: string; userId: string; business: BusinessDTO; role: UserRoleDTO };

export type GetAllEmployeesParams = { page?: number; limit?: number; search?: string };

export type CustomerDTO = {
  id: string; businessId: string; name: string;
  individual: boolean; address?: string; phone?: string; email?: string;
};
export type CustomerListResponseDTO = { data: CustomerDTO[]; total: number; page: number; limit: number };
export type CreateCustomerInputDTO = Omit<CustomerDTO, 'id'>;
export type UpdateCustomerInputDTO = Partial<Omit<CustomerDTO, 'id' | 'businessId'>>;
export type GetAllCustomersParams = { page?: number; limit?: number; search?: string };

export declare function createSdk(config: SdkConfig): {
  user: {
    get(id: string): Promise<UserDTO>;
    getByEmail(email: string): Promise<UserDTO>;
    create(input: CreateUserInputDTO): Promise<UserDTO>;
    update(id: string, input: UpdateUserInputDTO): Promise<UserDTO>;
    delete(id: string): Promise<UserDTO>;
    setRole(id: string, role: UserSystemRole): Promise<UserDTO>;
  };
  business: {
    getPublicDetails(id: string): Promise<BusinessPublicDetailsDTO>;
    getAll(): Promise<BusinessDTO[]>;
    get(id: string): Promise<BusinessDTO>;
    create(input: CreateBusinessInputDTO): Promise<BusinessDTO>;
    update(id: string, input: UpdateBusinessInputDTO): Promise<BusinessDTO>;
    delete(id: string): Promise<BusinessDTO>;
  };
  employee: {
    getAll(businessId: string, params?: GetAllEmployeesParams): Promise<EmployeeListResponseDTO>;
    get(employeeId: string): Promise<EmployeeDTO>;
    create(input: CreateEmployeeInputDTO): Promise<EmployeeDTO>;
    update(employeeId: string, input: UpdateEmployeeInputDTO): Promise<EmployeeDTO>;
    delete(employeeId: string): Promise<EmployeeDTO>;
  };
  businessRelation: {
    getAll(businessId: string): Promise<BusinessRelationDTO[]>;
    get(id: string): Promise<BusinessRelationDTO>;
    create(input: CreateBusinessRelationInputDTO): Promise<BusinessRelationDTO>;
    update(id: string, input: UpdateBusinessRelationInputDTO): Promise<BusinessRelationDTO>;
    delete(id: string): Promise<BusinessRelationDTO>;
    connect(businessId: string): Promise<{ token: string }>;
    getUserBusinesses(): Promise<BusinessRelationEnrichedDTO[]>;
  };
  userRole: {
    getAll(businessId: string): Promise<UserRoleDTO[]>;
    get(id: string): Promise<UserRoleDTO>;
    create(input: CreateUserRoleInputDTO): Promise<UserRoleDTO>;
    update(id: string, input: UpdateUserRoleInputDTO): Promise<UserRoleDTO>;
    delete(id: string): Promise<UserRoleDTO>;
  };
  customer: {
    getAll(businessId: string, params?: GetAllCustomersParams): Promise<CustomerListResponseDTO>;
    get(id: string): Promise<CustomerDTO>;
    create(input: CreateCustomerInputDTO): Promise<CustomerDTO>;
    update(id: string, input: UpdateCustomerInputDTO): Promise<CustomerDTO>;
    delete(id: string): Promise<CustomerDTO>;
  };
};
