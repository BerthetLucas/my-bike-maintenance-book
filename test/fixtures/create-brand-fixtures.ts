import { randomUUID } from 'crypto';
import { BrandConstructorParams } from 'src/brand/models/brand-constructor-params.model';
import { Brand } from 'src/domain/brand/brand.model';

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
