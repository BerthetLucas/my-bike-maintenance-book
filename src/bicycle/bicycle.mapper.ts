import { Bicycle } from './bicycle.model';
import type {
  DrizzleBicycle,
  DrizzleBicycleModel,
  DrizzleBrand,
  NewDrizzleBicycle,
} from '../db/schema';
import { BicycleRequestDto, BicycleResponseDto } from './dto/get-bicycle.dto';
import type { CreateBicycleDto } from './dto/create-bicycle.dto';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';
import { Brand } from 'src/brand/brand.model';
import { NewBicycle } from './new-bicycle.model';

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
      model: new BicycleModel({
        id: model.id,
        name: model.name,
        brand: new Brand({
          id: brand.id,
          name: brand.name,
          bicycleOnly: brand.bicycleOnly,
          sparePartOnly: brand.sparePartOnly,
        }),
      }),
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
