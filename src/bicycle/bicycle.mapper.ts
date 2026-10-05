import type { Bicycle, NewBicycle } from './bicycle.model';
import type { DrizzleBicycle, NewDrizzleBicycle } from '../db/schema';
import { BicycleRequestDto, BicycleResponseDto } from './dto/get-bicycle.dto';
import type { CreateBicycleDto } from './dto/create-bicycle.dto';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';
import { Brand } from 'src/brand/brand.model';

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
  fromDto(bicycle: BicycleRequestDto): string {
    return bicycle.id;
  }

  toDto(
    bicycle: Bicycle,
    model: BicycleModel,
    brand: Brand,
  ): BicycleResponseDto {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: model.name,
      brandName: brand.name,
    };
  }
}
