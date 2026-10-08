import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import {
  CreateBicycleModelMapper,
  DrizzleBicycleModelMapper,
} from './create-bicycle_model.mapper';
import { BicycleModel } from './bicycle.model';
import { bicycleModel, brand } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { Brand } from 'src/brand/brand.model';
import { NewBicycleModel } from './new-bicycle.model';

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
    const allModels = await this.db.select().from(bicycleModel);

    const models = allModels.map((m) => this.dbMapper.toDomain(m));

    return models;
  }

  async getById(id: string): Promise<BicycleModel> {
    const [modelRow] = await this.db
      .select()
      .from(bicycleModel)
      .where(eq(bicycleModel.id, id));

    if (!modelRow) {
      throw new Error('This model id does not exist');
    }

    return this.dbMapper.toDomain(modelRow);
  }

  async getAllWithBrand(): Promise<{ model: BicycleModel; brand: Brand }[]> {
    const rows = await this.db
      .select({
        bicycleModel,
        brand,
      })
      .from(bicycleModel)
      .innerJoin(brand, eq(bicycleModel.brandId, brand.id));

    return rows.map((r) => ({
      model: this.dbMapper.toDomain(r.bicycleModel),
      brand: r.brand,
    }));
  }
}
