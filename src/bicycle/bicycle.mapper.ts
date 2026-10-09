import { Bicycle } from './bicycle.model';
import {
  DrizzleBicycle,
  DrizzleBicycleModel,
  DrizzleBrand,
  NewDrizzleBicycle,
} from '../db/schema';
import { BicycleRequestDto, BicycleResponseDto } from './dto/get-bicycle.dto';
import type { CreateBicycleDto } from './dto/create-bicycle.dto';
import { NewBicycle } from './new-bicycle.model';
import { Injectable } from '@nestjs/common';
import { DrizzleBicycleModelMapper } from '../bicycle-model/create-bicycle-model.mapper';

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

@Injectable()
export class DrizzleBicycleMapper {
  constructor(private readonly modelMapper: DrizzleBicycleModelMapper) {}

  fromDomain(bicycle: Bicycle): DrizzleBicycle {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.model.id,
    };
  }

  toDomain({
    bicycle,
    brand,
    model,
  }: {
    bicycle: DrizzleBicycle;
    brand: DrizzleBrand;
    model: DrizzleBicycleModel;
  }): Bicycle {
    return new Bicycle({
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      model: this.modelMapper.toDomain({ model, brand }),
    });
  }
}

export class BicycleMapper {
  fromDto(bicycle: BicycleRequestDto): string {
    return bicycle.id;
  }

  toDto(bicycle: Bicycle): BicycleResponseDto {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.model.name,
      brandName: bicycle.model.brand.name,
    };
  }
}
