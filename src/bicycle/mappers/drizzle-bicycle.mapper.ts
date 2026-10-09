import { Injectable } from '@nestjs/common';
import {
  DrizzleBicycle,
  DrizzleBrand,
  DrizzleBicycleModel,
} from 'src/db/schema';
import { Bicycle } from '../models/bicycle.model';
import { DrizzleBicycleModelMapper } from 'src/bicycle-model/mappers/drizzle-bicycle-model.mapper';

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
