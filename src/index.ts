import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!, { relations });

export type DB = typeof db;

export default db;
