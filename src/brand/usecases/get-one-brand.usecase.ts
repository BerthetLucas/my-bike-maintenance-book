import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../brand.respository';
import { Brand } from '../brand.model';

@Injectable()
export class GetOneBrandUseCase {
  constructor(private readonly repository: BrandRepository) {}
  async execute(id: string): Promise<Brand> {
    const brand = await this.repository.getOne(id);

    return brand;
  }
}
