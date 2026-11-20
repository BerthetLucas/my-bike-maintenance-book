import { randomUUID } from 'crypto';
import {
  BicycleModel,
  BicycleModelConstructorParams,
} from 'src/domain/bicycle/bicycle-model/bicycle-model.model';
import { createBrandFixtures } from './create-brand-fixtures';

export function createBicycleModelFixtures(
  overrides?: Partial<BicycleModelConstructorParams>,
): BicycleModel {
  return new BicycleModel({
    id: randomUUID(),
    name: 'my-model-name',
    brand: createBrandFixtures({ sparePartOnly: false, bicycleOnly: true }),
    usage: 'Road',
    ...overrides,
  });
}
