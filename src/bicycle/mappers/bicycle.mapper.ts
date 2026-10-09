import { Bicycle } from '../models/bicycle.model';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { BicycleResponseDto } from '../dto/bicycle-response.dto';

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
