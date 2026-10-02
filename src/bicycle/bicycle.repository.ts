import { Injectable } from '@nestjs/common';
import { CreateBicycleMapper, DrizzleBicycleMapper } from './bicycle.mapper';
import type { DB } from '../index';
import type { Bicycle, BicycleWithModel, NewBicycle } from './bicycle.model';
import { bicycleModel, bicycle as bicycleTable } from '../db/schema';
import { InjectDb } from '../db/db.provider';
import { eq } from 'drizzle-orm';

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

    const bicycle = this.bicycleMapper.toDomain(bicycleRow);

    return bicycle;
  }

  async getAllWithModel(): Promise<BicycleWithModel[]> {
    const rows = await this.db
      .select({
        bicycle: bicycleTable,
        model: bicycleModel,
      })
      .from(bicycleTable)
      .innerJoin(bicycleModel, eq(bicycleTable.modelId, bicycleModel.id));

    return rows.map(({ bicycle, model }) => ({
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelId: model.id,
      modelName: model.name,
    }));
  }
}
