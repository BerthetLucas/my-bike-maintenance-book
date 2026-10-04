import { defineRelations } from 'drizzle-orm';
import { pgTable, varchar, uuid, boolean } from 'drizzle-orm/pg-core';

export const bicycle = pgTable('bicycle', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  isMarked: boolean().notNull().default(false),
  modelId: uuid()
    .references(() => bicycleModel.id)
    .notNull(),
});

export type DrizzleBicycle = typeof bicycle.$inferSelect;
export type NewDrizzleBicycle = typeof bicycle.$inferInsert;

export const bicycleModel = pgTable('bicycle_model', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  brandId: uuid()
    .references(() => brand.id)
    .notNull(),
});

export type DrizzleBicycleModel = typeof bicycleModel.$inferSelect;
export type DrizzleNewBicycleModel = typeof bicycleModel.$inferInsert;

export const brand = pgTable('brand', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  sparePartOnly: boolean(),
  bicycleOnly: boolean(),
});

export type DrizzleBrand = typeof brand.$inferSelect;
export type DrizzleNewBrand = typeof brand.$inferInsert;

export const relations = defineRelations(
  { bicycleModel, bicycle, brand },
  (r) => ({
    bicycle: {
      model: r.one.bicycleModel({
        from: r.bicycle.modelId,
        to: r.bicycleModel.id,
      }),
    },
    bicycleModel: {
      bicycle: r.many.bicycle(),
      brand: r.one.brand({
        from: r.bicycleModel.brandId,
        to: r.brand.id,
      }),
    },
    brand: {
      bicycleModel: r.many.bicycleModel(),
    },
  }),
);
