import { Injectable } from '@nestjs/common';
import { fromNewBicycleToNewDrizzleBicycle } from './bicycle.mapper';
import type { DB } from '../index';
import type { NewBicycle } from './bicycle.model';
import { bicycle } from '../db/schema';
import { InjectDb } from '../db/db.provider';

@Injectable()
export class BicycleRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(newBicycle: NewBicycle): Promise<void> {
    const drizzleBicycle = fromNewBicycleToNewDrizzleBicycle(newBicycle);

    await this.db.insert(bicycle).values(drizzleBicycle);
  }
}
