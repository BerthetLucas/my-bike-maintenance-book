import { Injectable } from '@nestjs/common';
import { CreateBicycleMapper, DrizzleBicycleMapper } from './bicycle.mapper';
import type { DB } from '../index';
import type { Bicycle, NewBicycle } from './bicycle.model';
import {
  bicycleModel,
  bicycle as bicycleTable,
  brand as brandTable,
} from '../db/schema';
import { InjectDb } from '../db/db.provider';
import { eq } from 'drizzle-orm';
import { BicycleModel } from 'src/bicycle_model/bicycle.model';
import { Brand } from 'src/brand/brand.model';

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
    const bicyclesRows = await this.db.select().from(bicycleTable);

    const bicycles = bicyclesRows.map((b) => this.bicycleMapper.toDomain(b));

    return bicycles;
  }

  async getById(id: string): Promise<Bicycle> {
    const [bicycleRow] = await this.db
      .select()
      .from(bicycleTable)
      .where(eq(bicycleTable.id, id));

    if (!bicycleRow) {
      throw new Error('This bicycle id does not exist');
    }

    const bicycle = this.bicycleMapper.toDomain(bicycleRow);

    return bicycle;
  }

  async getAllWithModel(): Promise<
    {
      bicycle: Bicycle;
      model: BicycleModel;
      brand: Brand;
    }[]
  > {
    const rows = await this.db
      .select({
        bicycle: bicycleTable,
        model: bicycleModel,
        brand: brandTable,
      })
      .from(bicycleTable)
      .innerJoin(bicycleModel, eq(bicycleTable.modelId, bicycleModel.id))
      .innerJoin(brandTable, eq(bicycleModel.brandId, brandTable.id));

    return rows.map((r) => ({
      bicycle: this.bicycleMapper.toDomain(r.bicycle),
      model: r.model,
      brand: r.brand,
    }));
  }
}
