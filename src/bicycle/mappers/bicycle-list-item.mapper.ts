import { Bicycle } from 'src/domain/bicycle/bicycle.model';
import { BicycleListItemResponseDto } from '../dto/bicycle-list-item-response.dto';

export class BicycleListItemMapper {
  toDto(bicycle: Bicycle): BicycleListItemResponseDto {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.model.name,
      brandName: bicycle.model.brand.name,
    };
  }
}
