import { GenericContainer } from 'testcontainers';

export async function getContainerSetUp() {
  return await new GenericContainer('postgres')
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'test_db',
    })
    .start();
}
