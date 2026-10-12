import { DrizzleBrand } from 'src/db/schema';

export function createBrandFixtures(
  overrides: Partial<DrizzleBrand> = {},
): DrizzleBrand {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'my-brand',
    sparePartOnly: false,
    bicycleOnly: true,
    ...overrides,
  };
}
