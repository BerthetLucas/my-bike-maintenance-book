import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { BicycleModule } from './bicycle/bicycle.module';
import { BicycleModelModule } from './bicycle-model/bicycle-model.module';
import { BrandModule } from './brand/brand.module';
import { SparePartModule } from './spare-part/spare-part.module';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BicycleModule,
    BicycleModelModule,
    BrandModule,
    SparePartModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
