import { Injectable } from '@nestjs/common';
import { CreateBicycleMapper, DrizzleBicycleMapper } from './bicycle.mapper';
import type { DB } from '../index';
import type { Bicycle } from './bicycle.model';
import {
  bicycle as bicycleTable,
  bicycleModel,
  brand as brandTable,
} from '../db/schema';
import { InjectDb } from '../db/db.provider';
import { eq } from 'drizzle-orm';
import { NewBicycle } from './new-bicycle.model';

@Injectable()
export class BicycleRepository {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly bicycleMapper: DrizzleBicycleMapper,
    private readonly createBicycleMapper: CreateBicycleMapper,
  ) {}

  async create(newBicycle: NewBicycle): Promise<void> {
    const insertBicycle = this.createBicycleMapper.fromDomain(newBicycle);

    await this.db.insert(bicycleTable).values(insertBicycle);
  }

  async getAll(): Promise<Bicycle[]> {
    const bicyclesRows = await this.db
      .select({
        bicycle: bicycleTable,
        model: bicycleModel,
        brand: brandTable,
      })
      .from(bicycleTable)
      .innerJoin(bicycleModel, eq(bicycleTable.modelId, bicycleModel.id))
      .innerJoin(brandTable, eq(bicycleModel.brandId, brandTable.id));

    return bicyclesRows.map((b) => this.bicycleMapper.toDomain(b));
  }

  async getById(id: string): Promise<Bicycle> {
    const [bicycleRow] = await this.db
      .select({
        bicycle: bicycleTable,
        model: bicycleModel,
        brand: brandTable,
      })
      .from(bicycleTable)
      .innerJoin(bicycleModel, eq(bicycleTable.modelId, bicycleModel.id))
      .innerJoin(brandTable, eq(bicycleModel.brandId, brandTable.id))
      .where(eq(bicycleTable.id, id));

    if (!bicycleRow) {
      throw new Error('This bicycle id does not exist');
    }

    return this.bicycleMapper.toDomain(bicycleRow);
  }
}
