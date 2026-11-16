import { Module } from '@nestjs/common';
import { CreateSparePartController } from './controllers/create-spare-part.controller';
import { CreateSparePartMapper } from './mappers/create-spare-part.mapper';
import { CreateSparePartUseCase } from './usecases/create-spare-part.usecase';
import { SparePartRepository } from './spare-part.repository';
import { DrizzleSparePartMapper } from './mappers/drizzle-spare-part-mapper';
import { BrandModule } from 'src/brand/brand.module';
import { DeleteSparePartController } from './controllers/delete-spare-part.controller';
import { DeleteSparePartUseCase } from './usecases/delete-spare-part.usecase';

@Module({
  controllers: [CreateSparePartController, DeleteSparePartController],
  providers: [
    CreateSparePartMapper,
    CreateSparePartUseCase,
    SparePartRepository,
    DrizzleSparePartMapper,
    DeleteSparePartUseCase,
  ],
  imports: [BrandModule],
  exports: [DrizzleSparePartMapper],
})
export class SparePartModule {}
