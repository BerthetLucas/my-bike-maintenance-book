import {
  bicycle,
  bicycleModel,
  brand,
  DrizzleBicycle,
  DrizzleBicycleModel,
  DrizzleBrand,
} from 'src/db/schema';
import { createDrizzleBicycleFixture } from './create-bicycle-fixtures';
import { createDrizzleBicycleModelFixture } from './create-bicycle-model-fixtures';
import { createDrizzleBrandFixtures } from './create-drizzle-brand-fixtures';
import { DB } from 'src';

interface CreateTestBicycleParams {
  db: DB;
  bicycleOverrides?: Partial<DrizzleBicycle>;
  modelOverrides?: Partial<DrizzleBicycleModel>;
  brandOverrides?: Partial<DrizzleBrand>;
}

export async function createTestBicycle({
  db,
  bicycleOverrides,
  modelOverrides,
  brandOverrides,
}: CreateTestBicycleParams): Promise<void> {
  const brandMock = createDrizzleBrandFixtures({ ...brandOverrides });
  const modelMock = createDrizzleBicycleModelFixture({
    brandId: brandMock.id,
    ...modelOverrides,
  });
  const bicycleMock = createDrizzleBicycleFixture({
    modelId: modelMock.id,
    ...bicycleOverrides,
  });

  await db.insert(brand).values(brandMock);
  await db.insert(bicycleModel).values(modelMock);
  await db.insert(bicycle).values(bicycleMock);
}
