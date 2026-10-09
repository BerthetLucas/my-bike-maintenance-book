import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../models/bicycle-model.model';
import { BicycleModelRepository } from '../bicycle-model.repository';

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(): Promise<BicycleModel[]> {
    return await this.repository.getAll();
  }
}
