import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { BicycleModule } from './bicycle/bicycle.module';
import { BicycleModelModule } from './bicycle-model/bicycle-model.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BicycleModule,
    BicycleModelModule,
    BrandModule,
  ],
})
export class AppModule {}
