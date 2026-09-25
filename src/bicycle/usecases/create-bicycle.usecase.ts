import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { fromCreateBicycleDtoToNewBicycle } from '../bicycle.mapper';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';

@Injectable()
export class CreateBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}
  async execute(command: CreateBicycleDto): Promise<void> {
    const bicycle = fromCreateBicycleDtoToNewBicycle(command);

    await this.bicycleRepository.create(bicycle);
  }
}
