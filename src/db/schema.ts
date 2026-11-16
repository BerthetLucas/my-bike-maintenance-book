import { defineRelations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  uuid,
  boolean,
  integer,
  pgEnum,
  date,
} from 'drizzle-orm/pg-core';
import { BICYCLE_USAGES } from '../domain/bicycle/bicycle-usage';

export const bicycle = pgTable('bicycle', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  km: integer().notNull().default(0),
  isMarked: boolean().notNull().default(false),
  modelId: uuid()
    .references(() => bicycleModel.id)
    .notNull(),
});

export type DrizzleBicycle = typeof bicycle.$inferSelect;
export type NewDrizzleBicycle = typeof bicycle.$inferInsert;

export const bicycleUsageEnum = pgEnum('bicycle_usage', BICYCLE_USAGES);

export const bicycleModel = pgTable('bicycle_model', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  usage: bicycleUsageEnum().notNull(),
  brandId: uuid()
    .references(() => brand.id)
    .notNull(),
});

export type DrizzleBicycleModel = typeof bicycleModel.$inferSelect;
export type DrizzleNewBicycleModel = typeof bicycleModel.$inferInsert;

export const brand = pgTable('brand', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  sparePartOnly: boolean().notNull(),
  bicycleOnly: boolean().notNull(),
});

export type DrizzleBrand = typeof brand.$inferSelect;
export type DrizzleNewBrand = typeof brand.$inferInsert;

export const sparePartTypeEnum = pgEnum('sparePart_type', [
  'Brake',
  'Chain',
  'Tire',
]);

export const seasonEnum = pgEnum('sparePart_season', ['summer', 'winter']);

export const sparePart = pgTable('sparePart', {
  id: uuid().primaryKey().defaultRandom(),
  type: sparePartTypeEnum().notNull(),
  mountedAt: date({ mode: 'date' }).defaultNow().notNull(),
  season: seasonEnum(),
  recommendedPressure: integer(),
  km: integer().notNull().default(0),
  brandId: uuid()
    .references(() => brand.id)
    .notNull(),
  bicycleId: uuid()
    .references(() => bicycle.id)
    .notNull(),
});

export type DrizzleSparePart = typeof sparePart.$inferSelect;
export type DrizzleNewSparePart = typeof sparePart.$inferInsert;

export const relations = defineRelations(
  { bicycleModel, bicycle, brand, sparePart },
  (r) => ({
    bicycle: {
      model: r.one.bicycleModel({
        from: r.bicycle.modelId,
        to: r.bicycleModel.id,
        optional: false,
      }),
      sparePart: r.many.sparePart(),
    },
    bicycleModel: {
      bicycle: r.many.bicycle(),
      brand: r.one.brand({
        from: r.bicycleModel.brandId,
        to: r.brand.id,
        optional: false,
      }),
    },
    brand: {
      bicycleModel: r.many.bicycleModel(),
      sparePart: r.many.sparePart(),
    },
    sparePart: {
      brand: r.one.brand({
        from: r.sparePart.brandId,
        to: r.brand.id,
        optional: false,
      }),
      bicycle: r.one.bicycle({
        from: r.sparePart.bicycleId,
        to: r.bicycle.id,
      }),
    },
  }),
);
