import { Injectable } from '@nestjs/common';
import { BicycleModel } from '../bicycle.model';
import { BicycleModelRepository } from '../bicycle_model.repository';
import { BrandRepository } from 'src/brand/brand.respository';
import { Brand } from 'src/brand/brand.model';

@Injectable()
export class GetOneBicycleModelsUseCase {
  constructor(
    private readonly modelRepository: BicycleModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(id: string): Promise<{ model: BicycleModel; brand: Brand }> {
    const model = await this.modelRepository.getById(id);

    const { brandId } = model;

    const brand = await this.brandRepository.getOne(brandId);

    return { model, brand };
  }
}
