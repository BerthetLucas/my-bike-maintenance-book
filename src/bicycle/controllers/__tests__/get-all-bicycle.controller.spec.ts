import request from 'supertest';
import { dropAllTables } from '../../../../test/drop-all-tables';
import { createTestBicycle } from '../../../../test/fixtures/create-test-bicycle';
import { getTestContext, TestContext } from './get-test-app.test-utils';

describe('Get All Bicycle integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it(`/GET bicycles`, async () => {
    const {
      bicycleMock: firstBike,
      modelMock: firstBikeModel,
      brandMock: firstBikeBrand,
    } = await createTestBicycle({ db: ctx.db });

    const {
      bicycleMock: secondBike,
      modelMock: secondBikeModel,
      brandMock: secondBikeBrand,
    } = await createTestBicycle({ db: ctx.db });

    const response = await request(ctx.app.getHttpServer()).get('/bicycles');

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual([
      {
        id: firstBike.id,
        name: firstBike.name,
        isMarked: firstBike.isMarked,
        modelName: firstBikeModel.name,
        brandName: firstBikeBrand.name,
      },
      {
        id: secondBike.id,
        name: secondBike.name,
        isMarked: secondBike.isMarked,
        modelName: secondBikeModel.name,
        brandName: secondBikeBrand.name,
      },
    ]);
  });

  afterAll(async () => {
    await ctx.close();
  });
});
