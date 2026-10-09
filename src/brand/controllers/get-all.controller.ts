import { BrandMapper } from '../brand.mapper';
import { Controller, Get } from '@nestjs/common';
import { GetAllBrandUseCase } from '../usecases/get-all-brand.usecase';
import { GetBrandResponseDto } from '../dto/get-brand-response.dto';

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
