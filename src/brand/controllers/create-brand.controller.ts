import { NewBrandMapper } from '../brand.mapper';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBrandUseCase } from '../usecases/create-brand.usecase';
import { CreateNewBrandRequestDto } from '../dto/create-new-brand-request.dto';

@Controller('brands')
export class CreateBrandController {
  constructor(
    private readonly usecase: CreateBrandUseCase,
    private readonly mapper: NewBrandMapper,
  ) {}

  @Post()
  async create(@Body() newBrand: CreateNewBrandRequestDto): Promise<void> {
    const brand = this.mapper.fromDto(newBrand);

    return await this.usecase.execute(brand);
  }
}
