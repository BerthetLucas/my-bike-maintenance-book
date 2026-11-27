import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';
import { BrandRepository } from 'src/brand/brand.respository';
import { Brand } from 'src/domain/brand/brand.model';

export interface GetBicycleUseCaseOutPut {
  bicycle: Bicycle;
  brand: Brand;
}

@Injectable()
export class GetBicycleUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(id: string): Promise<GetBicycleUseCaseOutPut> {
    const bicycle = await this.bicycleRepository.getById(id);
    const brand = await this.brandRepository.getOne(bicycle.model.brandId);

    return { bicycle, brand };
  }
}
