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

export const sparePart = pgTable('sparePart', {
  id: uuid().primaryKey().defaultRandom(),
  type: sparePartTypeEnum().notNull(),
  mountedAt: date().defaultNow(),
  km: integer().notNull().default(0),
  brandId: uuid()
    .references(() => brand.id)
    .notNull(),
  bicycleId: uuid()
    .references(() => bicycle.id)
    .notNull(),
});

export const relations = defineRelations(
  { bicycleModel, bicycle, brand, sparePart },
  (r) => ({
    bicycle: {
      model: r.one.bicycleModel({
        from: r.bicycle.modelId,
        to: r.bicycleModel.id,
      }),
      sparePart: r.many.sparePart(),
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
      sparePart: r.many.sparePart(),
    },
    sparePart: {
      brand: r.one.brand({
        from: r.sparePart.brandId,
        to: r.brand.id,
      }),
      bicycle: r.one.bicycle({
        from: r.sparePart.bicycleId,
        to: r.bicycle.id,
      }),
    },
  }),
);
