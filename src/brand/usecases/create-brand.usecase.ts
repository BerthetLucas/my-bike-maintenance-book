import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../brand.respository';

import { NewBrand } from '../new-brand.model';

@Injectable()
export class CreateBrandUseCase {
  constructor(private readonly repository: BrandRepository) {}
  async execute(newBrand: NewBrand) {
    await this.repository.create(newBrand);
  }
}
