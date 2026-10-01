import { Module } from '@nestjs/common';
import {
  BicycleModelMapper,
  CreateBicycleModelMapper,
  DrizzleBicycleModelMapper,
} from './create-bicycle_model.mapper';
import { BicycleModelRepository } from './bicycle_model.repository';
import { CreateBicycleModelUseCase } from './usecases/create-bicycle_model-usecase';
import { CreateBicycleModelController } from './controllers/create-bicycle_model.controller';
import { GetAllBicycleModelController } from './controllers/get-bicycles_models.controller';
import { GetAllBicycleModelsUseCase } from './usecases/get-all-bicycles_models.usecase';
import { GetOneBicycleModelsUseCase } from './usecases/get-bicycle_model.usecase';
import { GetOneBicycleModelController } from './controllers/get-bicycle_model.controller';

@Module({
  controllers: [
    CreateBicycleModelController,
    GetAllBicycleModelController,
    GetOneBicycleModelController,
  ],
  providers: [
    CreateBicycleModelMapper,
    BicycleModelRepository,
    CreateBicycleModelUseCase,
    GetAllBicycleModelsUseCase,
    DrizzleBicycleModelMapper,
    BicycleModelMapper,
    GetOneBicycleModelsUseCase,
  ],
})
export class BicycleModelModule {}
