import request from 'supertest';
import { dropAllTables } from '@test/drop-all-tables';
import { createTestBicycle } from '@test/fixtures/create-test-bicycle';
import { getTestContext, TestContext } from '@test/get-test-app.test-utils';
import { randomUUID } from 'crypto';
import { createBrandFixtures } from '@test/fixtures/create-brand-fixtures';
import { brand } from 'src/db/schema';

describe('Replace Spare Part controller Integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  describe('/PUT replace a spare part', () => {
    it('should replace an old spare part by a new one', async () => {
      const bicycleId = randomUUID();
      const oldSparePartId = randomUUID();

      const newSparePartbrand = createBrandFixtures({
        bicycleOnly: false,
        sparePartOnly: true,
      });

      await ctx.db.insert(brand).values(newSparePartbrand);

      await createTestBicycle({
        db: ctx.db,
        bicycleOverrides: { id: bicycleId },
        sparePartOverrides: { id: oldSparePartId, type: 'Chain' },
      });

      await request(ctx.app.getHttpServer())
        .put(`/bicycles/${bicycleId}/spare-parts/${oldSparePartId}`)
        .send({
          type: 'Chain',
          brandId: newSparePartbrand.id,
          km: 0,
          mountedAt: '2026-11-25',
        })
        .expect(200);

      const result = await ctx.db.query.sparePart.findMany({
        where: { bicycleId },
      });

      expect(result.length).toStrictEqual(2);
      expect(result[0].id).toStrictEqual(oldSparePartId);
      expect(result[0].isMountedOnABicycle).toStrictEqual(false);
      expect(result[1].isMountedOnABicycle).toStrictEqual(true);
    });
  });

  afterAll(async () => {
    await ctx.close();
  });
});
