import { Injectable } from '@nestjs/common';
import { DrizzleBicycleModel } from 'src/db/schema';
import { BicycleModel } from 'src/domain/bicycle/bicycle-model/bicycle-model.model';

@Injectable()
export class DrizzleBicycleModelMapper {
  toDomain(model: DrizzleBicycleModel): BicycleModel {
    return new BicycleModel({
      id: model.id,
      name: model.name,
      usage: model.usage,
      brandId: model.brandId,
    });
  }
}
