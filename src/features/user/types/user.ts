export type UserRole = 'admin' | 'user';

export type AppUser = {
  id: string;
  businessId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

export type CreateUserInput = Omit<AppUser, 'id' | 'businessId'>;

export type UpdateUserInput = Partial<CreateUserInput>;
