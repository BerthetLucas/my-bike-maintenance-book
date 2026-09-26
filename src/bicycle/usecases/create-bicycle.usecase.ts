import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { NewBicycle } from '../bicycle.model';

@Injectable()
export class CreateBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}
  async execute(command: NewBicycle): Promise<void> {
    await this.bicycleRepository.create(command);
  }
}
