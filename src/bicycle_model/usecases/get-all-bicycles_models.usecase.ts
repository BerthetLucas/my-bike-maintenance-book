import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../bicycle.model';
import { BicycleModelRepository } from '../bicycle_model.repository';

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(): Promise<BicycleModel[]> {
    const models = await this.repository.getAll();

    return models;
  }
}
