import { Module } from '@nestjs/common';
import { CreateSparePartController } from './controllers/create-spare-part.controller';
import { CreateSparePartMapper } from './mappers/create-spare-part.mapper';
import { CreateSparePartUseCase } from './usecases/create-spare-part.usecase';
import { SparePartRepository } from './spare-part.repository';
import { DrizzleSparePartMapper } from './mappers/drizzle-spare-part-mapper';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  controllers: [CreateSparePartController],
  providers: [
    CreateSparePartMapper,
    CreateSparePartUseCase,
    SparePartRepository,
    DrizzleSparePartMapper,
  ],
  imports: [BrandModule],
  exports: [DrizzleSparePartMapper],
})
export class SparePartModule {}
