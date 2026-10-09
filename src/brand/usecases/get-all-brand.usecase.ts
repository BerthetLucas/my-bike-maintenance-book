import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../brand.respository';
import { Brand } from '../models/brand.model';

@Injectable()
export class GetAllBrandUseCase {
  constructor(private readonly repository: BrandRepository) {}
  async execute(): Promise<Brand[]> {
    const brands = await this.repository.getAll();
    return brands;
  }
}
