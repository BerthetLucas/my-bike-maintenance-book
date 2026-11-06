import { Injectable } from '@nestjs/common';
import {
  DrizzleBicycle,
  DrizzleBrand,
  DrizzleBicycleModel,
  DrizzleSparePart,
} from 'src/db/schema';
import { DrizzleBicycleModelMapper } from 'src/bicycle-model/mappers/drizzle-bicycle-model.mapper';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';
import { DrizzleSparePartMapper } from 'src/spare-part/mappers/drizzle-spare-part-mapper';

@Injectable()
export class DrizzleBicycleMapper {
  constructor(
    private readonly modelMapper: DrizzleBicycleModelMapper,
    private readonly sparePartMapper: DrizzleSparePartMapper,
  ) {}

  fromDomain(bicycle: Bicycle): DrizzleBicycle {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: bicycle.model.id,
      km: bicycle.km,
    };
  }

  toDomain({
    bicycle,
    brand,
    model,
    spareParts,
  }: {
    bicycle: DrizzleBicycle;
    brand: DrizzleBrand;
    model: DrizzleBicycleModel;
    spareParts: (DrizzleSparePart & { brand: DrizzleBrand })[];
  }): Bicycle {
    return new Bicycle({
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      model: this.modelMapper.toDomain({ model, brand }),
      km: bicycle.km,
      spareParts: spareParts.map((s) =>
        this.sparePartMapper.toDomain(s, s.brand),
      ),
    });
  }
}
