import { Module } from '@nestjs/common';
import { GetAllBrandUseCase } from './usecases/get-all-brand.usecase';
import { CreateBrandUseCase } from './usecases/create-brand.usecase';
import { BrandRepository } from './brand.respository';
import { GetOneBrandUseCase } from './usecases/get-one-brand.usecase';
import {
  BrandMapper,
  DrizzleBrandMapper,
  DrizzleNewBrandMapper,
  NewBrandMapper,
} from './brand.mapper';
import { CreateBrandController } from './controllers/create-brand.controller';
import { GetAllBrandController } from './controllers/get-all.controller';
import { GetOneBrandController } from './controllers/get-one.controller';

@Module({
  providers: [
    GetOneBrandUseCase,
    GetAllBrandUseCase,
    CreateBrandUseCase,
    BrandRepository,
    BrandMapper,
    NewBrandMapper,
    DrizzleNewBrandMapper,
    DrizzleBrandMapper,
  ],
  controllers: [
    GetOneBrandController,
    GetAllBrandController,
    CreateBrandController,
  ],
  exports: [BrandRepository],
})
export class BrandModule {}
