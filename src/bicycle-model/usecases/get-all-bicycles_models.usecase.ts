import { Injectable } from '@nestjs/common';
import { BicycleModelRepository } from '../bicycle-model.repository';
import { BrandRepository } from 'src/brand/brand.respository';

export interface BicycleModelOutput {
  id: string;
  name: string;
  brandName: string;
}

@Injectable()
export class GetAllBicycleModelsUseCase {
  constructor(
    private readonly modelRepository: BicycleModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(): Promise<BicycleModelOutput[]> {
    const models = await this.modelRepository.getAll();
    const brands = await this.brandRepository.getAll();

    return models.map((model) => {
      const brand = brands.find((b) => b.id === model.brandId);
      if (!brand) throw new Error(`Brand ${model.brandId} not found`);

      return { id: model.id, name: model.name, brandName: brand.name };
    });
  }
}
