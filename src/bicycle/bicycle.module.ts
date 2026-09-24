import { Module } from '@nestjs/common';
import { BicycleController } from './bicycle.controller';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';

@Module({
  controllers: [BicycleController],
  providers: [CreateBicycleUseCase],
  exports: [],
  imports: [],
})
export class BicycleModule {}
