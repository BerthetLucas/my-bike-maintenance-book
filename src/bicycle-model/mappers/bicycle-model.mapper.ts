import { GetAllBicycleModelsUseCaseOutPut } from '../usecases/get-all-bicycles_models.usecase';

export class BicycleModelMapper {
  toDto(command: GetAllBicycleModelsUseCaseOutPut) {
    const { model, brand } = command;

    return {
      id: model.id,
      name: model.name,
      brandName: brand.name,
    };
  }
}
