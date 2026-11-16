import { Module } from '@nestjs/common';
import { GetAllBrandUseCase } from './usecases/get-all-brand.usecase';
import { CreateBrandUseCase } from './usecases/create-brand.usecase';
import { BrandRepository } from './brand.respository';
import { GetOneBrandUseCase } from './usecases/get-one-brand.usecase';
import { GetAllBrandController } from './controllers/get-all.controller';
import { GetOneBrandController } from './controllers/get-one.controller';
import { CreateBrandController } from './controllers/create-brand.controller';
import { BrandMapper } from './mappers/brand.mapper';
import { DrizzleBrandMapper } from './mappers/drizzle-brand.mapper';
import { CreateBrandMapper } from './mappers/create-brand.mapper';

@Module({
  providers: [
    GetOneBrandUseCase,
    GetAllBrandUseCase,
    CreateBrandUseCase,
    BrandRepository,
    BrandMapper,
    CreateBrandMapper,
    DrizzleBrandMapper,
  ],
  controllers: [
    GetOneBrandController,
    GetAllBrandController,
    CreateBrandController,
  ],
  exports: [BrandRepository, DrizzleBrandMapper],
})
export class BrandModule {}
