import { DrizzleBicycle, DrizzleBicycleModel } from 'src/db/schema';

export function createBicycleFixture(
  modelFixture: DrizzleBicycleModel,
  overrides?: Partial<DrizzleBicycle>,
): DrizzleBicycle {
  return {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'myBike',
    isMarked: true,
    modelId: modelFixture.id,
    ...overrides,
  };
}
