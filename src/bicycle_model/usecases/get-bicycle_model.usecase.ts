import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../bicycle.model';
import { BicycleModelRepository } from '../bicycle_model.repository';

@Injectable()
export class GetOneBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(id: string): Promise<BicycleModel> {
    const model = await this.repository.getById(id);

    return model;
  }
}
