import { BrandMapper } from '../brand.mapper';
import { Controller, Get } from '@nestjs/common';
import type { GetBrandResponseDto } from '../brand.model';
import { GetAllBrandUseCase } from '../usecases/get-all-brand.usecase';

@Controller('brands')
export class GetAllBrandController {
  constructor(
    private readonly usecase: GetAllBrandUseCase,
    private readonly mapper: BrandMapper,
  ) {}

  @Get()
  async getAll(): Promise<GetBrandResponseDto[]> {
    const brands = await this.usecase.execute();

    return brands.map((b) => this.mapper.toDto(b));
  }
}
