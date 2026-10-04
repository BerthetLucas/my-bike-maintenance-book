import type { Bicycle, BicycleWithModel, NewBicycle } from './bicycle.model';
import type { DrizzleBicycle, NewDrizzleBicycle } from '../db/schema';
import {
  GetBicycleByIdRequestDto,
  type GetBicycleDto,
} from './dto/get-bicycle.dto';
import type { CreateBicycleDto } from './dto/create-bicycle.dto';

export class CreateBicycleMapper {
  fromDomain(bicycle: NewBicycle): NewDrizzleBicycle {
    return {
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.modelId,
    };
  }

  fromDto(bicycle: CreateBicycleDto): NewBicycle {
    return {
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.modelId,
    };
  }
}

export class DrizzleBicycleMapper {
  fromDomain(bicycle: Bicycle): DrizzleBicycle {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.modelId,
    };
  }

  toDomain(bicycle: DrizzleBicycle): Bicycle {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.modelId,
    };
  }
}

export class BicycleMapper {
  fromDto(bicycle: GetBicycleByIdRequestDto): string {
    return bicycle.id;
  }

  toDto(bicycle: BicycleWithModel): GetBicycleDto {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.modelName,
      modelId: bicycle.modelId,
    };
  }
}
