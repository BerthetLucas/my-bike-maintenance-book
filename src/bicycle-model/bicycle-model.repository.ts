import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import { bicycleModel, brand } from 'src/db/schema';
import { BicycleModel } from './models/bicycle-model.model';
import { CreateBicycleModelMapper } from './mappers/create-bicycle-model.mapper';
import { DrizzleBicycleModelMapper } from './mappers/drizzle-bicycle-model.mapper';
import { NewBicycleModel } from './models/new-bicycle-model.model';

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
