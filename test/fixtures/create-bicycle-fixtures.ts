import { randomUUID } from 'crypto';
import {
  Bicycle,
  BicycleConstructorParams,
} from 'src/domain/bicycle/bicycle.model';
import { createBicycleModelFixtures } from './create-bicycle-model-fixtures';

export function createBicycleFixtures(
  overrides?: Partial<BicycleConstructorParams>,
): Bicycle {
  return new Bicycle({
    id: randomUUID(),
    name: 'my bicycle',
    isMarked: false,
    model: createBicycleModelFixtures(),
    km: 100,
    spareParts: [],
    ...overrides,
  });
}
