import { randomUUID } from 'crypto';
import { Chain, ChainConstructorParams } from 'src/domain/spare-part/chain';
import { createBrandFixtures } from './create-brand-fixtures';
import { BicycleUsage } from 'src/domain/bicycle/bicycle-usage.model';

export function createChainFixture(
  overrides?: Partial<ChainConstructorParams>,
): Chain {
  return new Chain({
    id: randomUUID(),
    time: new Date(),
    km: 0,
    brand: createBrandFixtures(),
    usage: new BicycleUsage({ bikeUsage: 'VTT' }),
    ...overrides,
  });
}
