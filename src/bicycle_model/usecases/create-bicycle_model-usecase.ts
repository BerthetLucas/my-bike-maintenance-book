import { Injectable } from '@nestjs/common';
import { BicycleModelRepository } from '../bicycle_model.repository';
import { NewBicycleModel } from '../bicycle.model';

@Injectable()
export class CreateBicycleModelUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(command: NewBicycleModel) {
    await this.repository.create(command);
  }
}
