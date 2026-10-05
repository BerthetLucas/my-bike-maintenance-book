import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';
import { Brand } from 'src/brand/brand.model';
import { Bicycle } from '../bicycle.model';

@Injectable()
export class GetAllBicyclesUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(): Promise<
    {
      bicycle: Bicycle;
      model: BicycleModel;
      brand: Brand;
    }[]
  > {
    const bicycles = await this.bicycleRepository.getAllWithModel();

    return bicycles;
  }
}
