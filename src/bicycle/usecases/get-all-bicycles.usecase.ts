import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { BicycleWithModel } from '../bicycle.model';

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(): Promise<BicycleWithModel[]> {
    const bicycles = await this.bicycleRepository.getAllWithModel();

    return bicycles;
  }
}
