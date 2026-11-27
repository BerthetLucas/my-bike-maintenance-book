import { BicycleListItemResponseDto } from '../dto/bicycle-list-item-response.dto';
import { GetAllBicyclesUseCaseOutPut } from '../usecases/get-all-bicycles.usecase';

export class BicycleListItemMapper {
  toDto(command: GetAllBicyclesUseCaseOutPut): BicycleListItemResponseDto {
    const { bicycle, brand } = command;

    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.model.name,
      brandName: brand.name,
      km: bicycle.km,
      warnings: bicycle.getWarnings(),
    };
  }
}
