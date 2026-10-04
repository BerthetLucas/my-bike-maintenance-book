import { BrandMapper } from '../brand.mapper';
import { Controller, Get, Param } from '@nestjs/common';
import type { GetBrandResponseDto, GetBrandResquestDto } from '../brand.model';
import { GetOneBrandUseCase } from '../usecases/get-one-brand.usecase';

@Controller('brands')
export class GetOneBrandController {
  constructor(
    private readonly usecase: GetOneBrandUseCase,
    private readonly mapper: BrandMapper,
  ) {}

  @Get(':id')
  async getOne(
    @Param() brandRequest: GetBrandResquestDto,
  ): Promise<GetBrandResponseDto> {
    const id = this.mapper.fromDto(brandRequest);

    const brand = await this.usecase.execute(id);

    return this.mapper.toDto(brand);
  }
}
