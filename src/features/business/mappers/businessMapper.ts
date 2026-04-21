import type {
  BusinessDTO,
  BusinessPublicDetailsDTO,
  CreateBusinessInputDTO,
  UpdateBusinessInputDTO,
} from '../types/businessDTO';
import type {
  Business,
  BusinessPublicDetails,
  CreateBusinessInput,
  UpdateBusinessInput,
} from '../types/business';

export function fromBusinessDTO(dto: BusinessDTO): Business {
  return {
    id: dto.id,
    name: dto.name,
    businessId: dto.businessId,
  };
}

export function fromBusinessPublicDetailsDTO(dto: BusinessPublicDetailsDTO): BusinessPublicDetails {
  return {
    id: dto.id,
    name: dto.name,
  };
}

export function toCreateBusinessDTO(input: CreateBusinessInput): CreateBusinessInputDTO {
  return { ...input };
}

export function toUpdateBusinessDTO(input: UpdateBusinessInput): UpdateBusinessInputDTO {
  return { ...input };
}
