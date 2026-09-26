import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { Bicycle } from '../bicycle.model';
import { GetBicycleByIdRequestDto } from '../dto/get-bicycle.dto';

@Injectable()
export class GetBicycleUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(command: GetBicycleByIdRequestDto): Promise<Bicycle> {
    const { id } = command;

    const bicycle = await this.bicycleRepository.getById(id);

    return bicycle;
  }
}
