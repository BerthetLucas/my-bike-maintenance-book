import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(): Promise<Bicycle[]> {
    return await this.bicycleRepository.getAllOrderedByName();
  }
}
