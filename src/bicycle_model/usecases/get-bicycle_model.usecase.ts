import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../bicycle.model';
import { BicycleModelRepository } from '../bicycle_model.repository';
import { GetBicycleModelByIdRequestDto } from '../dto/get-bicycle-model.dto';

@Injectable()
export class GetOneBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(command: GetBicycleModelByIdRequestDto): Promise<BicycleModel> {
    const { id } = command;

    const model = await this.repository.getById(id);

    return model;
  }
}
