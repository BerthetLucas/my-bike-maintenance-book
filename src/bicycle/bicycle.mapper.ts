import type { Bicycle, BicycleRequest, NewBicycle } from './bicycle.model';
import type { DrizzleBicycle, NewDrizzleBicycle } from '../db/schema';

export function fromNewBicycleToNewDrizzleBicycle(
  newBicycle: NewBicycle,
): NewDrizzleBicycle {
  return {
    name: newBicycle.name,
    isMarked: newBicycle.isMarked,
  };
}

export function fromDrizzleBicycleToBicycle(
  drizzleBicycle: DrizzleBicycle,
): Bicycle {
  return {
    id: drizzleBicycle.id,
    name: drizzleBicycle.name,
    isMarked: drizzleBicycle.isMarked,
  };
}

export function fromBicycleRequestToBicycle(
  bicycleRequest: BicycleRequest,
): NewBicycle {
  return {
    name: bicycleRequest.name,
    isMarked: bicycleRequest.isMarked,
  };
}

export function fromBicycleRequestToNewBicycle(
  bicycleRequest: BicycleRequest,
): NewBicycle {
  return {
    name: bicycleRequest.name,
    isMarked: bicycleRequest.isMarked,
  };
}
