import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { Test } from '@nestjs/testing';
import { relations } from 'src/db/schema';
import { getContainerSetUp } from './get-test-container-setup';
import { DB } from 'src';
import { AppModule } from 'src/app.module';
import { DB_PROVIDER } from 'src/db/db.provider';
import { getPool } from './get-pool-setup';

export interface TestContext {
  app: INestApplication<App>;
  db: DB;
  close: () => Promise<void>;
}

export async function getTestContext(): Promise<TestContext> {
  const container = await getContainerSetUp();
  const pool = getPool(container);
  const db = drizzle({ client: pool, relations });

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
