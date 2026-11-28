import request from 'supertest';
import { randomUUID } from 'crypto';
import { dropAllTables } from '@test/drop-all-tables';
import { TestContext, getTestContext } from '@test/get-test-app.test-utils';
import { createTestBicycle } from '@test/fixtures/create-test-bicycle';
import { createBrandFixtures } from '@test/fixtures/create-brand-fixtures';
import { brand as brandTable } from 'src/db/schema';

describe('Mount spare parts integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it('/POST mount spare parts', async () => {
    const bicycleId = randomUUID();

    const sparePartbrand = createBrandFixtures({
      bicycleOnly: false,
      sparePartOnly: true,
    });

    await ctx.db.insert(brandTable).values(sparePartbrand);

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

    await request(ctx.app.getHttpServer())
      .post(`/bicycles/${bicycleId}/spare-parts`)
      .send({
        spareParts: [
          {
            type: 'Chain',
            brandId: sparePartbrand.id,
            km: 0,
            mountedAt: '2026-11-25',
          },
        ],
      })
      .expect(201);

    const result = await ctx.db.query.sparePart.findMany({
      where: { bicycleId },
    });

    const chain = result.find((part) => part.type === 'Chain');

    expect(result.length).toBe(2);
    expect(result).toEqual(expect.arrayContaining([chain]));
  });

  afterAll(async () => {
    await ctx.close();
  });
});
