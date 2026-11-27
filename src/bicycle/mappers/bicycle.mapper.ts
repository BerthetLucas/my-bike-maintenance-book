import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { BicycleResponseDto } from '../dto/bicycle-response.dto';
import { GetBicycleUseCaseOutPut } from '../usecases/get-bicycle.usecase';

export class BicycleMapper {
  fromDto(bicycle: BicycleRequestDto): string {
    return bicycle.id;
  }

  toDto(command: GetBicycleUseCaseOutPut): BicycleResponseDto {
    const { bicycle, brand } = command;

    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.model.name,
      brandName: brand.name,
      km: bicycle.km,
    };
  }
}
