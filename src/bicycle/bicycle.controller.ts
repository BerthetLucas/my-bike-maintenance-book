import { Body, Controller, Post } from '@nestjs/common';
import type { BicycleRequest } from './dto/bicycle.dto';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';

// REST Convention : plural
@Controller('bicycles')
export class BicycleController {
  constructor(private readonly createBicycleUseCase: CreateBicycleUseCase) {}

  @Post()
  createBicycle(@Body() bicycle: BicycleRequest): void {
    console.log('create bicycle', bicycle);
    this.createBicycleUseCase.execute();
  }
}
