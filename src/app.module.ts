import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { BicycleModule } from './bicycle/bicycle.module';
import { BicycleModelModule } from './bicycle_model/bicycle_model.module';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BicycleModule,
    BicycleModelModule,
  ],
})
export class AppModule {}
