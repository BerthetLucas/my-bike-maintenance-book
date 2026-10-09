import { Controller, Get, Param } from '@nestjs/common';
import { GetOneBrandUseCase } from '../usecases/get-one-brand.usecase';
import { BrandRequestDto } from '../dto/brand-request.dto';
import { BrandResponseDto } from '../dto/brand-response.dto';
import { BrandMapper } from '../mappers/brand.mapper';

@Controller('brands')
export class GetOneBrandController {
  constructor(
    private readonly usecase: GetOneBrandUseCase,
    private readonly mapper: BrandMapper,
  ) {}

  @Get(':id')
  async getOne(
    @Param() brandRequest: BrandRequestDto,
  ): Promise<BrandResponseDto> {
    const id = this.mapper.fromDto(brandRequest);

    const brand = await this.usecase.execute(id);

    return this.mapper.toDto(brand);
  }
}
