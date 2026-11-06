import { randomUUID } from 'crypto';
import { Brand, BrandConstructorParams } from 'src/domain/brand/brand.model';

export function createBrandFixtures(
  overrides?: Partial<BrandConstructorParams>,
): Brand {
  return new Brand({
    id: randomUUID(),
    name: 'brand-name',
    sparePartOnly: true,
    bicycleOnly: false,
    ...overrides,
  });
}
