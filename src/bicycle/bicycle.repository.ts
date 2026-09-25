import { Injectable } from '@nestjs/common';
import { fromNewBicycleToNewDrizzleBicycle } from './bicycle.mapper';
import type { DB } from '../index';
import type { NewBicycle } from './bicycle.model';
import { bicycle } from '../db/schema';
import { InjectDb } from '../db/db.provider';
import type { DrizzleBicycle } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BicycleRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(newBicycle: NewBicycle): Promise<void> {
    const insertBicycle = fromNewBicycleToNewDrizzleBicycle(newBicycle);

    await this.db.insert(bicycle).values(insertBicycle);
  }

  async getAll(): Promise<DrizzleBicycle[]> {
    const bicycles = await this.db.select().from(bicycle);

    return bicycles;
  }

  async getById(id: string): Promise<DrizzleBicycle> {
    const [bicycleRow] = await this.db
      .select()
      .from(bicycle)
      .where(eq(bicycle.id, id));

    return bicycleRow;
  }
}
