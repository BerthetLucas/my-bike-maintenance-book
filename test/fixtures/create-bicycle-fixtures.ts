import { DrizzleBicycle } from 'src/db/schema';
import { createDrizzleBicycleModelFixture } from './create-bicycle-model-fixtures';

export function createDrizzleBicycleFixture(
  overrides?: Partial<DrizzleBicycle>,
): DrizzleBicycle {
  return {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'myBike',
    isMarked: true,
    modelId: createDrizzleBicycleModelFixture().id,
    ...overrides,
  };
}
