import {
  DrizzleBicycleModel,
  DrizzleBrand,
  DrizzleNewBicycleModel,
} from 'src/db/schema';
import { BicycleModel } from './bicycle.model';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { Brand } from 'src/brand/brand.model';
import { NewBicycleModel } from './new-bicycle-model.model';
import { Injectable } from '@nestjs/common';

// TODO Move this mapper
export class CreateBicycleModelMapper {
  fromDto(model: CreateBicycleModelDto): NewBicycleModel {
    return {
      name: model.name,
      brandId: model.brandId,
    };
  }

  fromDomain(model: NewBicycleModel): DrizzleNewBicycleModel {
    return {
      name: model.name,
      brandId: model.brandId,
    };
  }
}

// TODO Move this mapper
export class BicycleModelMapper {
  toDto(model: BicycleModel) {
    return {
      id: model.id,
      name: model.name,
      brandName: model.brand.name,
    };
  }
}

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
