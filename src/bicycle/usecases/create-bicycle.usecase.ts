import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { fromBicycleRequestToNewBicycle } from '../bicycle.mapper';
import type { BicycleRequest } from '../bicycle.model';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CreateBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}
  async execute(bicycle: BicycleRequest): Promise<void> {
    const domainBicycle = fromBicycleRequestToNewBicycle(bicycle);

    if (!domainBicycle.name) {
      throw new BadRequestException('Invalid Bicycle Request');
    }

    await this.bicycleRepository.create(domainBicycle);
  }
}
