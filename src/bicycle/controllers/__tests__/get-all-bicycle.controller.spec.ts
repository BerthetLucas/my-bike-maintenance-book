import request from 'supertest';
import { dropAllTables } from '../../../../test/drop-all-tables';
import { createTestBicycle } from '../../../../test/fixtures/create-test-bicycle';
import { getTestContext, TestContext } from './get-test-app.test-utils';
import { randomUUID } from 'node:crypto';
import { BicycleResponseDto } from 'src/bicycle/dto/bicycle-response.dto';

describe('Get All Bicycle integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it(`/GET bicycles`, async () => {
    const bicycleId = randomUUID();
    const bicycleIdBis = randomUUID();

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        id: bicycleIdBis,
        name: 'Mon vélo du samedi',
        isMarked: false,
      },
      modelOverrides: {
        name: 'Rockridder 2001',
      },
      brandOverrides: {
        name: 'Sport 2000',
      },
    });

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
    });

    const response = await request(ctx.app.getHttpServer()).get('/bicycles');

    expect(response.status).toStrictEqual(200);
    expect(response.body).toHaveLength(2);

    expect(response.body).toContainEqual({
      id: bicycleId,
      name: 'Mon vélo du dimanche',
      isMarked: true,
      modelName: 'Rockridder 2000',
      brandName: 'Decathlon',
    });

    expect(response.body).toContainEqual({
      id: bicycleIdBis,
      name: 'Mon vélo du samedi',
      isMarked: false,
      modelName: 'Rockridder 2001',
      brandName: 'Sport 2000',
    });
  });

  it('sort bicycle by alphabetical order', async () => {
    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        name: 'D',
      },
    });

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        name: 'B',
      },
    });

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        name: 'A',
      },
    });

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: {
        name: 'C',
      },
    });

    const response = await request(ctx.app.getHttpServer()).get('/bicycles');

    expect(response.status).toStrictEqual(200);

    expect((response.body as BicycleResponseDto[]).map((b) => b.name)).toEqual([
      'A',
      'B',
      'C',
      'D',
    ]);
  });

  afterAll(async () => {
    await ctx.close();
  });
});
