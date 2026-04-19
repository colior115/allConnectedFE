import type { UserDTO, CreateUserInputDTO, UpdateUserInputDTO } from '../types/dto/userDTO';
import type { AppUser, CreateUserInput, UpdateUserInput } from '../types/models/user';

export function fromUserDTO(dto: UserDTO): AppUser {
  return {
    id: dto.id,
    businessId: dto.businessId,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    role: dto.role,
  };
}

export function toCreateUserDTO(input: CreateUserInput): CreateUserInputDTO {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    role: input.role,
  };
}

export function toUpdateUserDTO(input: UpdateUserInput): UpdateUserInputDTO {
  return { ...input };
}
