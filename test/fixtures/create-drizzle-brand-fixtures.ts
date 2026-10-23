import { randomUUID } from 'crypto';
import { DrizzleBrand } from 'src/db/schema';

export function createDrizzleBrandFixtures(
  overrides: Partial<DrizzleBrand> = {},
): DrizzleBrand {
  return {
    id: randomUUID(),
    name: 'my-brand',
    sparePartOnly: false,
    bicycleOnly: true,
    ...overrides,
  };
}
