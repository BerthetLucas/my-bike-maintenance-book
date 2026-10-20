import request from 'supertest';
import { getTestContext, type TestContext } from './get-test-app.test-utils';
import { dropAllTables } from '../../../../test/drop-all-tables';
import { createTestBicycle } from '../../../../test/fixtures/create-test-bicycle';

describe('Get one Bicycle integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it(`/GET bicycles`, async () => {
    const { bicycleMock } = await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        name: 'Mon vélo du dimanche',
      },
      modelOverrides: {
        name: 'Rockridder 2000',
      },
      brandOverrides: {
        name: 'Decathlon',
      },
    });

    const response = await request(ctx.app.getHttpServer()).get(
      `/bicycles/${bicycleMock.id}`,
    );

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      id: bicycleMock.id,
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
