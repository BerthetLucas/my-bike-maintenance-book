import { Controller, Post, Body } from '@nestjs/common';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { CreateBicycleUseCase } from '../usecases/create-bicycle.usecase';
import { CreateBicycleMapper } from '../mappers/create-bicycle.mapper';

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
