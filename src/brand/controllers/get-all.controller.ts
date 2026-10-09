import { Controller, Get } from '@nestjs/common';
import { GetAllBrandUseCase } from '../usecases/get-all-brand.usecase';
import { BrandResponseDto } from '../dto/brand-response.dto';
import { BrandMapper } from '../mappers/brand.mapper';

@Controller('brands')
export class GetAllBrandController {
  constructor(
    private readonly usecase: GetAllBrandUseCase,
    private readonly mapper: BrandMapper,
  ) {}

  @Get()
  async getAll(): Promise<BrandResponseDto[]> {
    const brands = await this.usecase.execute();

    return brands.map((b) => this.mapper.toDto(b));
  }
}
