import { DrizzleBicycleModel, DrizzleNewBicycleModel } from 'src/db/schema';
import { BicycleModel, NewBicycleModel } from './bicycle.model';
import { CreateBicycleModelDto } from './dto/create-bicycle-model.dto';

export class CreateBicycleModelMapper {
  fromDto(model: CreateBicycleModelDto): NewBicycleModel {
    return {
      name: model.name,
    };
  }

  fromDomain(model: NewBicycleModel): DrizzleNewBicycleModel {
    return {
      name: model.name,
    };
  }
}

export class BicycleModelMapper {
  toDto(model: BicycleModel) {
    return {
      id: model.id,
      name: model.name,
    };
  }
}

export class DrizzleBicycleModelMapper {
  toDomain(model: DrizzleBicycleModel): BicycleModel {
    return {
      id: model.id,
      name: model.name,
    };
  }

  fromDomain(model: BicycleModel): DrizzleBicycleModel {
    return {
      id: model.id,
      name: model.name,
    };
  }
}
