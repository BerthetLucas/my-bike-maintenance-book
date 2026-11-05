import { Injectable } from '@nestjs/common';

import { DrizzleBicycleModel, DrizzleBrand } from 'src/db/schema';
import { BicycleModel } from 'src/domain/bicycle/bicycle-model/bicycle-model.model';
import { Brand } from 'src/domain/brand/brand.model';

@Injectable()
export class DrizzleBicycleModelMapper {
  toDomain({
    model,
    brand,
  }: {
    model: DrizzleBicycleModel;
    brand: DrizzleBrand;
  }): BicycleModel {
    return new BicycleModel({
      id: model.id,
      name: model.name,
      brand: new Brand({
        id: brand.id,
        name: brand.name,
        bicycleOnly: brand.bicycleOnly,
        sparePartOnly: brand.sparePartOnly,
      }),
    });
  }
}
