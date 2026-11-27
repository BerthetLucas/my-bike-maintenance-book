import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';
import { BrandRepository } from 'src/brand/brand.respository';
import { Brand } from 'src/domain/brand/brand.model';

export interface GetAllBicyclesUseCaseOutPut {
  bicycle: Bicycle;
  brand: Brand;
}

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly brandRespository: BrandRepository,
  ) {}

  async execute(): Promise<GetAllBicyclesUseCaseOutPut[]> {
    const bicycles = await this.bicycleRepository.getAllOrderedByName();
    const brands = await this.brandRespository.getAll();

    return bicycles.map((bicycle) => {
      const brand = brands.find((b) => b.id === bicycle.model.brandId);
      if (!brand) throw new Error(`Brand ${bicycle.model.brandId} not found`);

      return { bicycle, brand };
    });
  }
}
