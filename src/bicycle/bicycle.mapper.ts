import type { Bicycle, NewBicycle } from './bicycle.model';
import type { DrizzleBicycle, NewDrizzleBicycle } from '../db/schema';
import type { GetBicycleDto } from './dto/get-bicycle.dto';
import type { CreateBicycleDto } from './dto/create-bicycle.dto';

// POST Request -> Domain
export function fromCreateBicycleDtoToNewBicycle(
  bicycleRequest: CreateBicycleDto,
): NewBicycle {
  return {
    name: bicycleRequest.name,
    isMarked: bicycleRequest.isMarked,
  };
}

// POST Domain -> Database
export function fromNewBicycleToNewDrizzleBicycle(
  newBicycle: NewBicycle,
): NewDrizzleBicycle {
  return {
    name: newBicycle.name,
    isMarked: newBicycle.isMarked,
  };
}

// GET Database -> Domain
export function fromDrizzleBicycleToBicycle(
  drizzleBicycle: DrizzleBicycle,
): Bicycle {
  return {
    id: drizzleBicycle.id,
    name: drizzleBicycle.name,
    isMarked: drizzleBicycle.isMarked,
  };
}

// GET Domain -> Request
export function fromBicycleToGetBicycleDto(bicycle: Bicycle): GetBicycleDto {
  return {
    id: bicycle.id,
    name: bicycle.name,
    isMarked: bicycle.isMarked,
  };
}
