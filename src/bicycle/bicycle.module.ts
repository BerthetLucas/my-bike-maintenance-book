import { Module } from '@nestjs/common';
import { BicycleController } from './bicycle.controller';
import { CreateBicycleUseCase } from './usecases/create-bicycle.usecase';
import { BicycleRepository } from './bicycle.repository';

@Module({
  controllers: [BicycleController],
  providers: [CreateBicycleUseCase, BicycleRepository],
})
export class BicycleModule {}
