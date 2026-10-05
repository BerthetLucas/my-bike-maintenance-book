import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import type { Bicycle } from '../bicycle.model';
import { BicycleModelRepository } from 'src/bicycle_model/bicycle_model.repository';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';
import { BrandRepository } from 'src/brand/brand.respository';
import { Brand } from 'src/brand/brand.model';

@Injectable()
export class GetBicycleUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly bicycleModelRepository: BicycleModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<{ bicycle: Bicycle; model: BicycleModel; brand: Brand }> {
    const bicycle = await this.bicycleRepository.getById(id);

    const { modelId } = bicycle;
    const model = await this.bicycleModelRepository.getById(modelId);

    const { brandId } = model;
    const brand = await this.brandRepository.getOne(brandId);

    return { bicycle, model, brand };
  }
}
