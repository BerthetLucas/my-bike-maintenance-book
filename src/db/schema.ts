import { pgTable, varchar, uuid, boolean } from 'drizzle-orm/pg-core';

export const bicycle = pgTable('bicycle', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  isMarked: boolean().notNull().default(false),
});

export type DrizzleBicycle = typeof bicycle.$inferSelect;
export type NewDrizzleBicycle = typeof bicycle.$inferInsert;
