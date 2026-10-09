import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brand/models/brand.model';
import { DrizzleBicycleModel, DrizzleBrand } from 'src/db/schema';
import { BicycleModel } from '../models/bicycle-model.model';

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
