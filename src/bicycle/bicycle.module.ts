import { Module } from '@nestjs/common';
import { BicycleController } from './bicycle.controller';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { BicycleRepository } from './bicycle.repository';
import { GetAllBicyclesUseCase } from './usecases/get-all-bicycles.usecase';
import { GetBicycleUseCase } from './usecases/get-bicycle.usecase';

@Module({
  controllers: [BicycleController],
  providers: [
    CreateBicycleUseCase,
    GetAllBicyclesUseCase,
    GetBicycleUseCase,
    BicycleRepository,
  ],
})
export class BicycleModule {}
