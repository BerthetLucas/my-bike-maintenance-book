import { DrizzleNewBicycleModel } from 'src/db/schema';
import { CreateBicycleModelDto } from '../dto/create-bicycle-model.dto';
import { NewBicycleModel } from '../models/new-bicycle-model.model';

export class CreateBicycleModelMapper {
  fromDto(model: CreateBicycleModelDto): NewBicycleModel {
    return {
      name: model.name,
      brandId: model.brandId,
      usage: model.usage,
    };
  }

  fromDomain(model: NewBicycleModel): DrizzleNewBicycleModel {
    return {
      name: model.name,
      brandId: model.brandId,
      usage: model.usage,
    };
  }
}
