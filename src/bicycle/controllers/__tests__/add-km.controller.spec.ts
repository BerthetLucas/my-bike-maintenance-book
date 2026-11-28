import request from 'supertest';

import { dropAllTables } from '@test/drop-all-tables';
import { createTestBicycle } from '@test/fixtures/create-test-bicycle';
import { getTestContext, TestContext } from '@test/get-test-app.test-utils';
import { randomUUID } from 'node:crypto';

describe('Add distance integration test', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  describe('/POST add km', () => {
    it('should add distance to the bicycle and the associated parts', async () => {
      const bicycleId = randomUUID();

      await createTestBicycle({
        db: ctx.db,
        bicycleOverrides: {
          id: bicycleId,
          name: 'Mon vélo du dimanche',
          isMarked: true,
          km: 0,
        },
        modelOverrides: {
          name: 'Rockridder 2000',
        },
        brandOverrides: {
          name: 'Decathlon',
        },
        sparePartOverrides: {
          type: 'Chain',
          mountedAt: new Date(),
          km: 0,
          isMountedOnABicycle: true,
        },
      });

      await request(ctx.app.getHttpServer())
        .post(`/bicycles/${bicycleId}/add-km`)
        .send({
          km: 100,
        })
        .expect(201);

      const result = await ctx.db.query.bicycle.findFirst({
        where: { id: bicycleId },
        with: { sparePart: true },
      });

      expect(result?.km).toEqual(100);
      expect(result?.sparePart[0].km).toEqual(100);
    });

    it('should generate an error if the distance is negative', async () => {
      const bicycleId = randomUUID();

      await createTestBicycle({
        db: ctx.db,
        bicycleOverrides: {
          id: bicycleId,
          name: 'Mon vélo du dimanche',
          isMarked: true,
          km: 0,
        },
        modelOverrides: {
          name: 'Rockridder 2000',
        },
        brandOverrides: {
          name: 'Decathlon',
        },
        sparePartOverrides: {
          type: 'Chain',
          mountedAt: new Date(),
          km: 0,
          isMountedOnABicycle: true,
        },
      });

      await request(ctx.app.getHttpServer())
        .post(`/bicycles/${bicycleId}/add-km`)
        .send({
          km: -100,
        })
        .expect(400);

      const result = await ctx.db.query.bicycle.findFirst({
        where: { id: bicycleId },
        with: { sparePart: true },
      });

      expect(result?.km).toEqual(0);
      expect(result?.sparePart[0].km).toEqual(0);
    });
  });

  afterAll(async () => {
    await ctx.close();
  });
});
