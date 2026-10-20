import { DB } from 'src';
import { bicycle, bicycleModel, brand } from 'src/db/schema';

export async function dropAllTables(db: DB): Promise<void> {
  await db.delete(bicycle);
  await db.delete(bicycleModel);
  await db.delete(brand);
}
