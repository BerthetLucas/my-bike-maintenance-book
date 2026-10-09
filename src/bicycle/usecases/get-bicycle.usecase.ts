import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { Bicycle } from '../models/bicycle.model';

@Injectable()
export class GetBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(id: string): Promise<Bicycle> {
    return await this.bicycleRepository.getById(id);
  }
}
