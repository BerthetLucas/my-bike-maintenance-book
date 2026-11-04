import { randomUUID } from 'crypto';
import { BicycleUsage } from 'src/domain/bicycle/bicycle-usage.model';
import { Tire, TireConstructorParams } from 'src/domain/spare-part/tire';
import { createBrandFixtures } from './create-brand-fixtures';

export function createTireFixtures(
  overrides?: Partial<TireConstructorParams>,
): Tire {
  return new Tire({
    id: randomUUID(),
    season: 'summer',
    usage: new BicycleUsage({ bikeUsage: 'VTT' }),
    recommendedPressure: 10,
    km: 0,
    time: new Date(),
    brand: createBrandFixtures(),
    ...overrides,
  });
}
