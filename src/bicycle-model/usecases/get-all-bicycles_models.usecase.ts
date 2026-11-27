import { Injectable } from '@nestjs/common';
import { BicycleModelRepository } from '../bicycle-model.repository';
import { BrandRepository } from 'src/brand/brand.respository';
import { BicycleModel } from 'src/domain/bicycle/bicycle-model/bicycle-model.model';
import { Brand } from 'src/domain/brand/brand.model';

export interface GetAllBicycleModelsUseCaseOutPut {
  model: BicycleModel;
  brand: Brand;
}

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(
    private readonly modelRepository: BicycleModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(): Promise<GetAllBicycleModelsUseCaseOutPut[]> {
    const models = await this.modelRepository.getAll();
    const brands = await this.brandRepository.getAll();

    return models.map((model) => {
      const brand = brands.find((b) => b.id === model.brandId);
      if (!brand) throw new Error(`Brand ${model.brandId} not found`);

      return { model, brand };
    });
  }
}
