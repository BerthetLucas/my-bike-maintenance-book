import request from 'supertest';
import { randomUUID } from 'crypto';
import { dropAllTables } from '../../../../test/drop-all-tables';
import {
  TestContext,
  getTestContext,
} from '../../../../test/get-test-app.test-utils';
import { createTestBicycle } from '../../../../test/fixtures/create-test-bicycle';
import { brand, sparePart } from 'src/db/schema';
import { createBrandFixtures } from '../../../../test/fixtures/create-brand-fixtures';
import { createDrizzleSparePartFixture } from '../../../../test/fixtures/create-drizzle-spare-part-fixtures';

describe('Delete a spare part integrationtest', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await getTestContext();
  });

  afterEach(async () => {
    await dropAllTables(ctx.db);
  });

  it('/PUT spare part', async () => {
    const biycleId = randomUUID();
    const sparePartBrandId = randomUUID();
    const sparePartId = randomUUID();

    const sparePartBrandMock = createBrandFixtures({
      id: sparePartBrandId,
      bicycleOnly: false,
      sparePartOnly: true,
    });

    const sparePartMock = createDrizzleSparePartFixture({
      id: sparePartId,
      bicycleId: biycleId,
      brandId: sparePartBrandId,
    });

    await createTestBicycle({
      db: ctx.db,
      bicycleOverrides: { id: biycleId },
    });

    await ctx.db.insert(brand).values(sparePartBrandMock);
    await ctx.db.insert(sparePart).values(sparePartMock);

    await request(ctx.app.getHttpServer()).put(`/spare-parts/${sparePartId}`);

    const result = await ctx.db.query.sparePart.findFirst({
      where: { id: sparePartId },
    });

    expect(result?.isMountedOnABicycle).toBe(false);

    afterAll(async () => {
      await ctx.close();
    });
  });
});
