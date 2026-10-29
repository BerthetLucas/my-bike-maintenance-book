import { Injectable } from '@nestjs/common';
import { BicycleModelRepository } from '../bicycle-model.repository';
import { BicycleModel } from 'src/domain/bicycle/bicycle-model/bicycle-model.model';

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(): Promise<BicycleModel[]> {
    return await this.repository.getAll();
  }
}
