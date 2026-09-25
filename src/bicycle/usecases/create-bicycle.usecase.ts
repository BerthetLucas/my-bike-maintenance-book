import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { fromCreateBicycleDtoToNewBicycle } from '../bicycle.mapper';
import type { BicycleRequest } from '../bicycle.model';

@Injectable()
export class CreateBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}
  async execute(bicycle: BicycleRequest): Promise<void> {
    const domainBicycle = fromCreateBicycleDtoToNewBicycle(bicycle);

    await this.bicycleRepository.create(domainBicycle);
  }
}
