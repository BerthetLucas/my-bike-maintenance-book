import { randomUUID } from 'crypto';
import { Brake, BrakeConstructorParams } from 'src/domain/spare-part/brake';

export function createBrakeFixtures(
  overrides?: Partial<BrakeConstructorParams>,
): Brake {
  return new Brake({
    id: randomUUID(),
    km: 100,
    brandId: randomUUID(),
    mountedAt: new Date(),
    ...overrides,
  });
}
