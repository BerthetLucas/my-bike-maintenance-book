import { DrizzleNewSparePart } from 'src/db/schema';
import { CreateSparePartDto } from '../dto/create-spare-part.dto';
import { NewSparePart } from '../models/new-spare-part.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSparePartMapper {
  fromDto(createSparePartDto: CreateSparePartDto): NewSparePart {
    return {
      type: createSparePartDto.type,
      mountedAt: new Date(createSparePartDto.mountedAt),
      km: createSparePartDto.km,
      brandId: createSparePartDto.brandId,
      bicycleId: createSparePartDto.bicycleId,
    };
  }

  fromDomain(newSparePart: NewSparePart): DrizzleNewSparePart {
    return {
      type: newSparePart.type,
      mountedAt: newSparePart.mountedAt,
      km: newSparePart.km,
      brandId: newSparePart.brandId,
      bicycleId: newSparePart.bicycleId,
    };
  }
}
