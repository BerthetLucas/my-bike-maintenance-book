import { randomUUID } from 'crypto';
import { Tire, TireConstructorParams } from 'src/domain/spare-part/tire';

export function createTireFixtures(
  overrides?: Partial<TireConstructorParams>,
): Tire {
  return new Tire({
    id: randomUUID(),
    season: 'summer',
    recommendedPressure: 10,
    km: 0,
    mountedAt: new Date(),
    brandId: randomUUID(),
    ...overrides,
  });
}
