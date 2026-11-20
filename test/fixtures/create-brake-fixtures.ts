import { randomUUID } from 'crypto';
import { Brake, BrakeConstructorParams } from 'src/domain/spare-part/brake';
import { createBrandFixtures } from './create-brand-fixtures';

export function createBrakeFixtures(
  overrides?: Partial<BrakeConstructorParams>,
): Brake {
  return new Brake({
    id: randomUUID(),
    km: 100,
    brand: createBrandFixtures(),
    mountedAt: new Date(),
    ...overrides,
  });
}
