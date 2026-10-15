import { DrizzleBicycleModel } from 'src/db/schema';
import { createDrizzleBrandFixtures } from './create-drizzle-brand-fixtures';

export function createDrizzleBicycleModelFixture(
  overrides?: Partial<DrizzleBicycleModel>,
): DrizzleBicycleModel {
  return {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'my-model',
    brandId: createDrizzleBrandFixtures().id,
    ...overrides,
  };
}
