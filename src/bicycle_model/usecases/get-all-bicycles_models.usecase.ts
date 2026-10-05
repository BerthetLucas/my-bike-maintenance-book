import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../bicycle.model';
import { BicycleModelRepository } from '../bicycle_model.repository';
import { Brand } from 'src/brand/brand.model';

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(private readonly repository: BicycleModelRepository) {}

  async execute(): Promise<{ model: BicycleModel; brand: Brand }[]> {
    const models = await this.repository.getAllWithBrand();

    return models;
  }
}
