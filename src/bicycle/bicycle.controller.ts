import { Body, Controller, Post } from '@nestjs/common';
import type { BicycleRequest } from './bicycle.model';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';

// REST Convention : plural
@Controller('bicycles')
export class BicycleController {
  constructor(private readonly createBicycleUseCase: CreateBicycleUseCase) {}

  @Post()
  async createBicycle(@Body() bicycle: BicycleRequest): Promise<void> {
    await this.createBicycleUseCase.execute(bicycle);
  }
}
