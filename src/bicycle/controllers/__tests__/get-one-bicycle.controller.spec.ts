import request from 'supertest';

import { dropAllTables } from '../../../../test/drop-all-tables';
import { createTestBicycle } from '../../../../test/fixtures/create-test-bicycle';
import { randomUUID } from 'node:crypto';
import {
  getTestContext,
  TestContext,
} from '../../../../test/get-test-app.test-utils';

describe('Get one Bicycle integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it(`/GET bicycles`, async () => {
    const bicycleId = randomUUID();
    const sparePartId = randomUUID();

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        id: bicycleId,
        name: 'Mon vélo du dimanche',
        isMarked: true,
      },
      modelOverrides: {
        name: 'Rockridder 2000',
      },
      brandOverrides: {
        name: 'Decathlon',
      },
      sparePartOverrides: {
        id: sparePartId,
        mountedAt: new Date('2026-01-01'),
      },
    });

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
      km: 0,
      spareParts: [
        {
          id: sparePartId,
          type: 'Brake',
          km: 100,
          mountedAt: '2026-01-01T00:00:00.000Z',
          brandName: 'my-brand',
          warnings: [],
        },
      ],
    });
  });

  afterAll(async () => {
    await ctx.close();
  });
});
