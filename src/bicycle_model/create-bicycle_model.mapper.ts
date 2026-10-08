import { DrizzleBicycleModel, DrizzleNewBicycleModel } from 'src/db/schema';
import { BicycleModel } from './bicycle.model';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';
import { BicycleModelRequestDto } from './dto/get-bicycle-model.dto';
import { Brand } from 'src/brand/brand.model';
import { NewBicycleModel } from './new-bicycle.model';

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

export class BicycleModelMapper {
  fromDto(model: BicycleModelRequestDto): string {
    return model.id;
  }

  toDto(model: BicycleModel, brand: Brand) {
    return {
      id: model.id,
      name: model.name,
      brandName: brand.name,
    };
  }
}

export class DrizzleBicycleModelMapper {
  toDomain(model: DrizzleBicycleModel): BicycleModel {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brandId,
    };
  }

  fromDomain(model: BicycleModel): DrizzleBicycleModel {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brandId,
    };
  }
}
