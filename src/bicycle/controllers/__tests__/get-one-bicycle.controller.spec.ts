import { Test } from '@nestjs/testing';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { BicycleMapper } from 'src/bicycle/mappers/bicycle.mapper';
import { BicycleRepository } from 'src/bicycle/bicycle.repository';
import { DB_PROVIDER } from 'src/db/db.provider';
import { DrizzleBicycleMapper } from 'src/bicycle/mappers/drizzle-bicycle.mapper';
import { CreateBicycleMapper } from 'src/bicycle/mappers/create-bicycle.mapper';
import { DrizzleBicycleModelMapper } from 'src/bicycle-model/mappers/drizzle-bicycle-model.mapper';
import { bicycle, bicycleModel, brand } from 'src/db/schema';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { getContainerSetUp } from '../../../../test/get-test-container-setup';
import { getPool } from '../../../../test/get-pool-setup';
import type { DB } from 'src/index';
import { Pool } from 'pg';
import { StartedTestContainer } from 'testcontainers';
import { createBicycleFixture } from '../../../../test/fixtures/create-bicycle-fixtures';
import { createBrandFixtures } from '../../../../test/fixtures/create-brand-fixtures';
import { createBicycleModelFixture } from '../../../../test/fixtures/create-bicycle-model-fixtures';
import { GetOneBicycleController } from '../get-one-bicycle.controller';
import { GetBicycleUseCase } from 'src/bicycle/usecases/get-bicycle.usecase';

describe('Get one Bicycle integration test', () => {
  let app: INestApplication<App>;
  let container: StartedTestContainer;
  let pool: Pool;
  let db: DB;

  const brandMock = createBrandFixtures();
  const modelMock = createBicycleModelFixture(brandMock);
  const bicycleMock = createBicycleFixture(modelMock);

  beforeAll(async () => {
    container = await getContainerSetUp();
    pool = getPool(container);
    db = drizzle({ client: pool });

    await migrate(db, { migrationsFolder: './drizzle' });

    const module = await Test.createTestingModule({
      controllers: [GetOneBicycleController],
      providers: [
        GetBicycleUseCase,
        BicycleMapper,
        BicycleRepository,
        DrizzleBicycleMapper,
        CreateBicycleMapper,
        DrizzleBicycleModelMapper,
        { provide: DB_PROVIDER, useValue: db },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  }, 60000);

  beforeEach(async () => {
    await db.insert(brand).values(brandMock);
    await db.insert(bicycleModel).values(modelMock);
    await db.insert(bicycle).values(bicycleMock);
  });

  afterEach(async () => {
    await db.delete(bicycle);
    await db.delete(bicycleModel);
    await db.delete(brand);
  });

  it(`/GET bicycles`, async () => {
    const response = await request(app.getHttpServer()).get(
      '/bicycles/33333333-3333-4333-8333-333333333333',
    );

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      id: '33333333-3333-4333-8333-333333333333',
      name: 'myBike',
      isMarked: true,
      modelName: 'my-model',
      brandName: 'my-brand',
    });
  });

  afterAll(async () => {
    await app.close();
    await pool.end();
    await container.stop();
  });
});
