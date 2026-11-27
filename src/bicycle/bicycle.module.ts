import { Module } from '@nestjs/common';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { BicycleRepository } from './bicycle.repository';
import { GetAllBicyclesUseCase } from './usecases/get-all-bicycles.usecase';
import { GetBicycleUseCase } from './usecases/get-bicycle.usecase';
import { GetAllBicycleController } from './controllers/get-all-bicycles.controller';
import { CreateBicycleController } from './controllers/create-bicycle.controller';
import { GetOneBicycleController } from './controllers/get-one-bicycle.controller';
import { BicycleModelModule } from 'src/bicycle-model/bicycle-model.module';
import { BrandModule } from 'src/brand/brand.module';
import { BicycleMapper } from './mappers/bicycle.mapper';
import { CreateBicycleMapper } from './mappers/create-bicycle.mapper';
import { DrizzleBicycleMapper } from './mappers/drizzle-bicycle.mapper';
import { BicycleListItemMapper } from './mappers/bicycle-list-item.mapper';
import { SparePartModule } from 'src/spare-part/spare-part.module';
import { MountSparePartsController } from './controllers/mount-spare-part.controller';
import { MountSparePartUseCase } from './usecases/mount-spare-part.usecase';
import { MountSparePartMapper } from './mappers/mount-spare-part.mapper';

@Module({
  controllers: [
    GetOneBicycleController,
    GetAllBicycleController,
    CreateBicycleController,
    MountSparePartsController,
  ],
  providers: [
    CreateBicycleUseCase,
    GetAllBicyclesUseCase,
    GetBicycleUseCase,
    BicycleRepository,
    DrizzleBicycleMapper,
    CreateBicycleMapper,
    BicycleMapper,
    BicycleListItemMapper,
    MountSparePartUseCase,
    MountSparePartMapper,
  ],
  imports: [BicycleModelModule, BrandModule, SparePartModule],
})
export class BicycleModule {}
