import { BrandMapper } from '../brand.mapper';
import { Controller, Get, Param } from '@nestjs/common';
import { GetOneBrandUseCase } from '../usecases/get-one-brand.usecase';
import { GetBrandRequestDto } from '../dto/get-brand-request.dto';
import { GetBrandResponseDto } from '../dto/get-brand-response.dto';

@Controller('brands')
export class GetOneBrandController {
  constructor(
    private readonly usecase: GetOneBrandUseCase,
    private readonly mapper: BrandMapper,
  ) {}

  @Get(':id')
  async getOne(
    @Param() brandRequest: GetBrandRequestDto,
  ): Promise<GetBrandResponseDto> {
    const id = this.mapper.fromDto(brandRequest);

    const brand = await this.usecase.execute(id);

    return this.mapper.toDto(brand);
  }
}
