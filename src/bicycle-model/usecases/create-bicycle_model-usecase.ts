import { Injectable } from '@nestjs/common';
import { BicycleModelRepository } from '../bicycle-model.repository';
import { BrandRepository } from 'src/brand/brand.respository';
import { NewBicycleModel } from '../new-bicycle-model.model';

@Injectable()
export class CreateBicycleModelUseCase {
  constructor(
    private readonly modelRepository: BicycleModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(command: NewBicycleModel) {
    const { brandId } = command;

    const isBrandIdAvailable = await this.brandRepository.getOne(brandId);

    if (!isBrandIdAvailable) {
      throw new Error('This brand is not available');
    }

    await this.modelRepository.create(command);
  }
}
