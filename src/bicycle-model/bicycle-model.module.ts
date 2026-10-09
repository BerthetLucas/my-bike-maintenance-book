import { Module } from '@nestjs/common';
import { BicycleModelRepository } from './bicycle-model.repository';
import { CreateBicycleModelUseCase } from './usecases/create-bicycle_model-usecase';
import { CreateBicycleModelController } from './controllers/create-bicycle_model.controller';
import { GetAllBicycleModelController } from './controllers/get-bicycles_models.controller';
import { GetAllBicycleModelsUseCase } from './usecases/get-all-bicycles_models.usecase';
import { BrandModule } from 'src/brand/brand.module';
import { CreateBicycleModelMapper } from './mappers/create-bicycle-model.mapper';
import { BicycleModelMapper } from './mappers/bicycle-model.mapper';
import { DrizzleBicycleModelMapper } from './mappers/drizzle-bicycle-model.mapper';

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
