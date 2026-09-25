import { Body, Controller, Post } from '@nestjs/common';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { CreateBicycleDto } from './dto/create-bicycle.dto';

// REST Convention : plural
@Controller('bicycles')
export class BicycleController {
  constructor(private readonly createBicycleUseCase: CreateBicycleUseCase) {}

  @Post()
  async createBicycle(
    @Body() createBicycleDto: CreateBicycleDto,
  ): Promise<void> {
    await this.createBicycleUseCase.execute(createBicycleDto);
  }
}
