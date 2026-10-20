import { DrizzleBicycle } from 'src/db/schema';
import { createDrizzleBicycleModelFixture } from './create-bicycle-model-fixtures';
import { randomUUID } from 'crypto';

export function createDrizzleBicycleFixture(
  overrides?: Partial<DrizzleBicycle>,
): DrizzleBicycle {
  return {
    id: randomUUID(),
    name: 'myBike',
    isMarked: true,
    modelId: createDrizzleBicycleModelFixture().id,
    ...overrides,
  };
}
