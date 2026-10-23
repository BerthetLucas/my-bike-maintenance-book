import { DrizzleBicycleModel } from 'src/db/schema';
import { createDrizzleBrandFixtures } from './create-drizzle-brand-fixtures';
import { randomUUID } from 'crypto';

export function createDrizzleBicycleModelFixture(
  overrides?: Partial<DrizzleBicycleModel>,
): DrizzleBicycleModel {
  return {
    id: randomUUID(),
    name: 'my-model',
    brandId: createDrizzleBrandFixtures().id,
    ...overrides,
  };
}
