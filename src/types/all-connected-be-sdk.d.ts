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

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserSystemRole;
};
export type CreateUserInput = Omit<User, 'id'>;
export type UpdateUserInput = Partial<CreateUserInput>;

export type Business = { id: string; name: string; businessId: string };
export type BusinessPublicDetails = Pick<Business, 'id' | 'name'>;
export type CreateBusinessInput = Omit<Business, 'id'>;
export type UpdateBusinessInput = Partial<CreateBusinessInput>;

export type Employee = {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  hireDate: string;
  employmentStatus: EmploymentStatus;
  employeeId: string;
  email?: string;
  phone?: string;
  terminationDate?: string;
};
export type EmployeeListItem = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  employmentStatus: EmploymentStatus;
};
export type EmployeeListResponse = {
  data: EmployeeListItem[];
  total: number;
  page: number;
  limit: number;
};
export type CreateEmployeeInput = Omit<Employee, 'id'>;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;
export type GetAllEmployeesParams = { page?: number; limit?: number; search?: string };

export type UserRole = {
  id: string;
  businessId: string;
  roleName: string;
  permissions: Permissions;
};
export type CreateUserRoleInput = Omit<UserRole, 'id'>;
export type UpdateUserRoleInput = Partial<Omit<UserRole, 'id'>>;

export type BusinessRelation = { id: string; userId: string; businessId: string; roleId: string };
export type CreateBusinessRelationInput = Omit<BusinessRelation, 'id'>;
export type UpdateBusinessRelationInput = { roleId: string };
export type BusinessRelationView = {
  id: string;
  userId: string;
  business: Business;
  role: UserRole;
};

export declare function createSdk(config: SdkConfig): {
  user: {
    get(id: string): Promise<User>;
    create(input: CreateUserInput): Promise<User>;
    update(id: string, input: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
    setRole(id: string, role: UserSystemRole): Promise<User>;
  };
  business: {
    getPublicDetails(id: string): Promise<BusinessPublicDetails>;
    getAll(): Promise<Business[]>;
    get(id: string): Promise<Business>;
    create(input: CreateBusinessInput): Promise<Business>;
    update(id: string, input: UpdateBusinessInput): Promise<Business>;
    delete(id: string): Promise<Business>;
  };
  employee: {
    getAll(businessId: string, params?: GetAllEmployeesParams): Promise<EmployeeListResponse>;
    get(employeeId: string): Promise<Employee>;
    create(input: CreateEmployeeInput): Promise<Employee>;
    update(employeeId: string, input: UpdateEmployeeInput): Promise<Employee>;
    delete(employeeId: string): Promise<Employee>;
  };
  businessRelation: {
    getAll(businessId: string): Promise<BusinessRelation[]>;
    get(id: string): Promise<BusinessRelation>;
    create(input: CreateBusinessRelationInput): Promise<BusinessRelation>;
    update(id: string, input: UpdateBusinessRelationInput): Promise<BusinessRelation>;
    delete(id: string): Promise<BusinessRelation>;
    connect(businessId: string): Promise<{ token: string }>;
    getUserBusinesses(): Promise<BusinessRelationView[]>;
  };
  userRole: {
    getAll(businessId: string): Promise<UserRole[]>;
    get(id: string): Promise<UserRole>;
    create(input: CreateUserRoleInput): Promise<UserRole>;
    update(id: string, input: UpdateUserRoleInput): Promise<UserRole>;
    delete(id: string): Promise<UserRole>;
  };
};
