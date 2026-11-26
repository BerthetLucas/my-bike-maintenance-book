import { randomUUID } from 'crypto';
import { Chain, ChainConstructorParams } from 'src/domain/spare-part/chain';

export function createChainFixture(
  overrides?: Partial<ChainConstructorParams>,
): Chain {
  return new Chain({
    id: randomUUID(),
    mountedAt: new Date(),
    km: 0,
    brandId: randomUUID(),
    ...overrides,
  });
}
