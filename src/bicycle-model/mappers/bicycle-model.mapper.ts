import { BicycleModelOutput } from '../usecases/get-all-bicycles_models.usecase';

export class BicycleModelMapper {
  toDto(model: BicycleModelOutput) {
    return {
      id: model.id,
      name: model.name,
      brandName: model.brandName,
    };
  }
}
