import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { BicycleWithModel } from '../bicycle.model';
import { BicycleModelRepository } from 'src/bicycle_model/bicycle_model.repository';

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly bicycleModelRepository: BicycleModelRepository,
  ) {}

  async execute(): Promise<BicycleWithModel[]> {
    const bicycles = await this.bicycleRepository.getAllWithModel();

    return bicycles;
  }
}
