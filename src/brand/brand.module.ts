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
import { DrizzleNewBrandMapper } from './mappers/drizzle-new-brand.mapper';
import { NewBrandMapper } from './mappers/new-brand.mapper';

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
