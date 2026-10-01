import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import {
  CreateBicycleModelMapper,
  DrizzleBicycleModelMapper,
} from './create-bicycle_model.mapper';
import { BicycleModel, NewBicycleModel } from './bicycle.model';
import { bicycleModel } from 'src/db/schema';
import { eq } from 'drizzle-orm';

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

    return this.dbMapper.toDomain(modelRow);
  }
}
