import { DrizzleBicycleModel, DrizzleBrand } from 'src/db/schema';

export function createBicycleModelFixture(
  brandFixture: DrizzleBrand,
  overrides?: Partial<DrizzleBicycleModel>,
): DrizzleBicycleModel {
  return {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'my-model',
    brandId: brandFixture.id,
    ...overrides,
  };
}
