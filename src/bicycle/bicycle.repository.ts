import { Injectable } from '@nestjs/common';
import { CreateBicycleMapper, DrizzleBicycleMapper } from './bicycle.mapper';
import type { DB } from '../index';
import type { Bicycle, NewBicycle } from './bicycle.model';
import { bicycle as bicycleTable } from '../db/schema';
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
}
