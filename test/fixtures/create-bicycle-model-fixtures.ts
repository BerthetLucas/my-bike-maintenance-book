import { randomUUID } from 'crypto';
import {
  BicycleModel,
  BicycleModelConstructorParams,
} from 'src/domain/bicycle/bicycle-model/bicycle-model.model';

export function createBicycleModelFixtures(
  overrides?: Partial<BicycleModelConstructorParams>,
): BicycleModel {
  return new BicycleModel({
    id: randomUUID(),
    name: 'my-model-name',
    brandId: randomUUID(),
    usage: 'Road',
    ...overrides,
  });
}
