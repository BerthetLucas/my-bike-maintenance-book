import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { getPool } from '../../../../test/get-pool-setup';
import { DB } from '../../../index';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { getContainerSetUp } from '../../../../test/get-test-container-setup';
import { AppModule } from '../../../app.module';
import { DB_PROVIDER } from '../../../db/db.provider';
import { Test } from '@nestjs/testing';

export interface TestContext {
  app: INestApplication<App>;
  db: DB;
  close: () => Promise<void>;
}

export async function getTestContext(): Promise<TestContext> {
  const container = await getContainerSetUp();
  const pool = getPool(container);
  const db = drizzle({ client: pool });

  await migrate(db, { migrationsFolder: './drizzle' });

  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DB_PROVIDER)
    .useValue(db)
    .compile();

  const app: INestApplication<App> = module.createNestApplication();
  await app.init();

  return {
    app,
    db,
    close: async () => {
      await app.close();
      await pool.end();
      await container.stop();
    },
  };
}
