import { Controller, Post, Body } from '@nestjs/common';
import { CreateBicycleMapper } from '../bicycle.mapper';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { CreateBicycleUseCase } from '../usecases/create-bicycle.usecase';

@Controller('bicycles')
export class CreateBicycleController {
  constructor(
    private readonly createBicycleUseCase: CreateBicycleUseCase,
    private readonly createBicycleMapper: CreateBicycleMapper,
  ) {}

  @Post()
  async createBicycle(
    @Body() createBicycleDto: CreateBicycleDto,
  ): Promise<void> {
    const bicycle = this.createBicycleMapper.fromDto(createBicycleDto);

    await this.createBicycleUseCase.execute(bicycle);
  }
}
