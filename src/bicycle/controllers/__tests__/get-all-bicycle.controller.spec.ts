import { bicycle, bicycleModel, brand } from 'src/db/schema';
import request from 'supertest';
import { createBicycleFixture } from '../../../../test/fixtures/create-bicycle-fixtures';
import { createBrandFixtures } from '../../../../test/fixtures/create-brand-fixtures';
import { createBicycleModelFixture } from '../../../../test/fixtures/create-bicycle-model-fixtures';
import { getTestContext, TestContext } from './get-test-app.test-utils';

describe('Get All Bicycle integration test', () => {
  let ctx: TestContext;

  const brandMock = createBrandFixtures();
  const modelMock = createBicycleModelFixture(brandMock);
  const bicycleMock = createBicycleFixture(modelMock);

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  beforeEach(async () => {
    await ctx.db.insert(brand).values(brandMock);
    await ctx.db.insert(bicycleModel).values(modelMock);
    await ctx.db.insert(bicycle).values(bicycleMock);
  });

  afterEach(async () => {
    await ctx.db.delete(bicycle);
    await ctx.db.delete(bicycleModel);
    await ctx.db.delete(brand);
  });

  it(`/GET bicycles`, async () => {
    const response = await request(ctx.app.getHttpServer()).get('/bicycles');

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual([
      {
        id: '33333333-3333-4333-8333-333333333333',
        name: 'myBike',
        isMarked: true,
        modelName: 'my-model',
        brandName: 'my-brand',
      },
    ]);
  });

  afterAll(async () => {
    await ctx.close();
  });
});
