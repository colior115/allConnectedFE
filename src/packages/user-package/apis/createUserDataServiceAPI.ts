import type { CreateUserInputDTO, UpdateUserInputDTO, UserDTO } from '@colior115/all-connected-be-sdk';
import type { Shell } from 'repluggable';
import type { CreateUserInput, UpdateUserInput, User } from '../types/user';
import type { UserDataServiceAPI } from './userDataServiceAPI';
import { AllConnectedServerSdkAPI } from '../../../common-services';

const fromUserDTO = (dto: UserDTO): User => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  role: dto.role,
});

const toUpdateUserInputDTO = (data: UpdateUserInput): UpdateUserInputDTO => ({
  firstName: data.firstName,
  lastName: data.lastName,
  role: data.role,
});

const toCreateUserInputDTO = (data: CreateUserInput): CreateUserInputDTO => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  role: data.role || 'user',
});

export const createUserDataServiceAPI = (shell: Shell): UserDataServiceAPI => {
  const allConnectedServerSdkAPI = shell.getAPI(AllConnectedServerSdkAPI);

  return {
    async getUser(id) {
      const dto: UserDTO = await allConnectedServerSdkAPI.user.get(id);
      return fromUserDTO(dto);
    },

    async getUserByEmail(email) {
      const dto: UserDTO = await allConnectedServerSdkAPI.user.getByEmail(email);
      return fromUserDTO(dto);
    },

    async createUser(data: CreateUserInput) {
      const dto: UserDTO = await allConnectedServerSdkAPI.user.create(toCreateUserInputDTO(data));
      return fromUserDTO(dto);
    },

    async updateUser(id, data) {
      const dto: UserDTO = await allConnectedServerSdkAPI.user.update(id, toUpdateUserInputDTO(data));
      return fromUserDTO(dto);
    },

    async deleteUser(id) {
      const dto: UserDTO = await allConnectedServerSdkAPI.user.delete(id);
      return fromUserDTO(dto);
    },
  }
};
