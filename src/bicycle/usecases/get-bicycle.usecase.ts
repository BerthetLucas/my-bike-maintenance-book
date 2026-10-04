import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { Bicycle, BicycleWithModel } from '../bicycle.model';
import { BicycleModelRepository } from 'src/bicycle_model/bicycle_model.repository';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';

@Injectable()
export class GetBicycleUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly bicycleModelRepository: BicycleModelRepository,
  ) {}

  async execute(id: string): Promise<BicycleWithModel> {
    const bicycle = await this.bicycleRepository.getById(id);
    const { modelId } = bicycle;
    const model = await this.bicycleModelRepository.getById(modelId);

    return this.toBicycleWithModel(bicycle, model);
  }

  toBicycleWithModel(bicycle: Bicycle, model: BicycleModel): BicycleWithModel {
    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: model.name,
      modelId: model.id,
    };
  }
}
