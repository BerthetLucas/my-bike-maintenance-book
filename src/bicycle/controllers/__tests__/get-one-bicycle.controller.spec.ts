import { bicycle, bicycleModel, brand } from 'src/db/schema';
import request from 'supertest';
import { createDrizzleBrandFixtures } from '../../../../test/fixtures/create-drizzle-brand-fixtures';
import { getTestContext, type TestContext } from './get-test-app.test-utils';
import { createDrizzleBicycleModelFixture } from '../../../../test/fixtures/create-bicycle-model-fixtures';
import { createDrizzleBicycleFixture } from '../../../../test/fixtures/create-bicycle-fixtures';

describe('Get one Bicycle integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await ctx.dropTables();
  });

  it(`/GET bicycles`, async () => {
    const brandId = '100690fb-799f-4fe9-ad71-ad355cd929c2';
    const modelId = '5f038a44-28fb-4d5b-b8a4-7d2f80e7beb6';
    const bicycleId = '5f76d2b7-beb9-4c01-9c8d-870df39c4641';

    await ctx.db.insert(brand).values(
      createDrizzleBrandFixtures({
        id: brandId,
        name: 'Decathlon',
      }),
    );

    await ctx.db.insert(bicycleModel).values(
      createDrizzleBicycleModelFixture({
        id: modelId,
        brandId,
        name: 'Rockridder 2000',
      }),
    );
    await ctx.db.insert(bicycle).values(
      createDrizzleBicycleFixture({
        id: bicycleId,
        name: 'Mon vélo du dimanche',
        isMarked: true,
      }),
    );

    const response = await request(ctx.app.getHttpServer()).get(
      `/bicycles/${bicycleId}`,
    );

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      id: bicycleId,
      name: 'Mon vélo du dimanche',
      isMarked: true,
      modelName: 'Rockridder 2000',
      brandName: 'Decathlon',
    });
  });

  afterAll(async () => {
    await ctx.close();
  });
});
