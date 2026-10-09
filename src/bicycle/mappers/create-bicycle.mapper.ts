import { NewDrizzleBicycle } from 'src/db/schema';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { NewBicycle } from '../models/new-bicycle.model';

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
