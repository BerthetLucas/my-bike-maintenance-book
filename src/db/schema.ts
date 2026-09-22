import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const hello_pg_table = pgTable('hello_pg_table', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
});
