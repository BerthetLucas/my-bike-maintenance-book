import { randomUUID } from 'crypto';
import { DrizzleSparePart } from 'src/db/schema';

export function createDrizzleSparePartFixture(
  overrides?: Partial<DrizzleSparePart>,
): DrizzleSparePart {
  return {
    id: randomUUID(),
    type: 'Brake',
    mountedAt: new Date(),
    season: null,
    recommendedPressure: null,
    km: 100,
    brandId: randomUUID(),
    bicycleId: randomUUID(),
    isMountedOnABicycle: true,
    ...overrides,
  };
}
