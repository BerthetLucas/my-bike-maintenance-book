import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import {
  CreateBicycleModelMapper,
  DrizzleBicycleModelMapper,
} from './create-bicycle-model.mapper';
import { BicycleModel } from './bicycle.model';
import { bicycleModel, brand } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { NewBicycleModel } from './new-bicycle-model.model';

@Injectable()
export class BicycleModelRepository {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly createMapper: CreateBicycleModelMapper,
    private readonly dbMapper: DrizzleBicycleModelMapper,
  ) {}

  async create(model: NewBicycleModel) {
    const newModel = this.createMapper.fromDomain(model);

    await this.db.insert(bicycleModel).values(newModel);
  }

  async getAll(): Promise<BicycleModel[]> {
    const rows = await this.db
      .select({
        model: bicycleModel,
        brand,
      })
      .from(bicycleModel)
      .innerJoin(brand, eq(bicycleModel.brandId, brand.id));

    return rows.map((r) => this.dbMapper.toDomain(r));
  }
}
