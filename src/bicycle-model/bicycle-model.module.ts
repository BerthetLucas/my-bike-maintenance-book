import { Module } from '@nestjs/common';
import {
  BicycleModelMapper,
  CreateBicycleModelMapper,
  DrizzleBicycleModelMapper,
} from './create-bicycle-model.mapper';
import { BicycleModelRepository } from './bicycle-model.repository';
import { CreateBicycleModelUseCase } from './usecases/create-bicycle_model-usecase';
import { CreateBicycleModelController } from './controllers/create-bicycle_model.controller';
import { GetAllBicycleModelController } from './controllers/get-bicycles_models.controller';
import { GetAllBicycleModelsUseCase } from './usecases/get-all-bicycles_models.usecase';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  controllers: [CreateBicycleModelController, GetAllBicycleModelController],
  providers: [
    CreateBicycleModelMapper,
    BicycleModelRepository,
    CreateBicycleModelUseCase,
    GetAllBicycleModelsUseCase,
    DrizzleBicycleModelMapper,
    BicycleModelMapper,
  ],
  exports: [BicycleModelRepository, DrizzleBicycleModelMapper],
  imports: [BrandModule],
})
export class BicycleModelModule {}
