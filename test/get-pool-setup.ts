import { Pool } from 'pg';
import { StartedTestContainer } from 'testcontainers';

export function getPool(container: StartedTestContainer) {
  return new Pool({
    host: container.getHost(),
    port: container.getMappedPort(5432),
    user: 'test',
    password: 'test',
    database: 'test_db',
  });
}
