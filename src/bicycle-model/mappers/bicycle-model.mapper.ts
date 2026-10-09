import { BicycleModel } from '../models/bicycle-model.model';

export class BicycleModelMapper {
  toDto(model: BicycleModel) {
    return {
      id: model.id,
      name: model.name,
      brandName: model.brand.name,
    };
  }
}
