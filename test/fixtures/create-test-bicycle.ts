import {
  bicycle,
  bicycleModel,
  brand,
  DrizzleBicycle,
  DrizzleBicycleModel,
  DrizzleBrand,
  DrizzleSparePart,
  sparePart,
} from 'src/db/schema';
import { createDrizzleBicycleFixture } from './create-bicycle-fixtures';
import { createDrizzleBicycleModelFixture } from './create-bicycle-model-fixtures';
import { createDrizzleBrandFixtures } from './create-drizzle-brand-fixtures';
import { DB } from 'src';
import { createDrizzleSparePartFixture } from './create-drizzle-spare-part-fixtures';

interface CreateTestBicycleParams {
  db: DB;
  bicycleOverrides?: Partial<DrizzleBicycle>;
  modelOverrides?: Partial<DrizzleBicycleModel>;
  brandOverrides?: Partial<DrizzleBrand>;
  sparePartOverrides?: Partial<DrizzleSparePart>;
}

export async function createTestBicycle({
  db,
  bicycleOverrides,
  modelOverrides,
  brandOverrides,
  sparePartOverrides,
}: CreateTestBicycleParams): Promise<void> {
  const brandMock = createDrizzleBrandFixtures({ ...brandOverrides });
  const sparePartBrandMock = createDrizzleBrandFixtures({
    sparePartOnly: true,
    bicycleOnly: false,
  });
  const modelMock = createDrizzleBicycleModelFixture({
    brandId: brandMock.id,
    ...modelOverrides,
  });
  const bicycleMock = createDrizzleBicycleFixture({
    modelId: modelMock.id,
    ...bicycleOverrides,
  });
  const sparePartMock = createDrizzleSparePartFixture({
    bicycleId: bicycleMock.id,
    brandId: sparePartBrandMock.id,
    ...sparePartOverrides,
  });

  await db.insert(brand).values(brandMock);
  await db.insert(brand).values(sparePartBrandMock);
  await db.insert(bicycleModel).values(modelMock);
  await db.insert(bicycle).values(bicycleMock);
  await db.insert(sparePart).values(sparePartMock);
}
