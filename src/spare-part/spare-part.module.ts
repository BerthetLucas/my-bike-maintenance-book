import { Module } from '@nestjs/common';
import { DrizzleSparePartMapper } from './mappers/drizzle-spare-part-mapper';

@Module({
  providers: [DrizzleSparePartMapper],
  exports: [DrizzleSparePartMapper],
})
export class SparePartModule {}
