import { Module } from '@nestjs/common';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { BicycleRepository } from './bicycle.repository';
import { GetAllBicyclesUseCase } from './usecases/get-all-bicycles.usecase';
import { GetBicycleUseCase } from './usecases/get-bicycle.usecase';
import {
  BicycleMapper,
  CreateBicycleMapper,
  DrizzleBicycleMapper,
} from './bicycle.mapper';
import { GetAllBicycleController } from './controllers/get-all-bicycles.controller';
import { CreateBicycleController } from './controllers/create-bicycle.controller';
import { GetOneBicycleController } from './controllers/get-one-bicycle.controller';

@Module({
  controllers: [
    GetOneBicycleController,
    GetAllBicycleController,
    CreateBicycleController,
  ],
  providers: [
    CreateBicycleUseCase,
    GetAllBicyclesUseCase,
    GetBicycleUseCase,
    BicycleRepository,
    DrizzleBicycleMapper,
    CreateBicycleMapper,
    BicycleMapper,
  ],
})
export class BicycleModule {}
