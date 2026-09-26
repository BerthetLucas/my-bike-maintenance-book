import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { Bicycle } from '../bicycle.model';

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(): Promise<Bicycle[]> {
    const bicycles = await this.bicycleRepository.getAll();

    return bicycles;
  }
}
