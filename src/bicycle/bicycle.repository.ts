import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import {
  bicycle as bicycleTable,
  sparePart as sparePartTable,
} from '../db/schema';
import { InjectDb } from '../db/db.provider';
import { NewBicycle } from './models/new-bicycle.model';
import { CreateBicycleMapper } from './mappers/create-bicycle.mapper';
import { DrizzleBicycleMapper } from './mappers/drizzle-bicycle.mapper';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';
import { DrizzleSparePartMapper } from 'src/spare-part/mappers/drizzle-spare-part-mapper';

@Injectable()
export class BicycleRepository {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly bicycleMapper: DrizzleBicycleMapper,
    private readonly createBicycleMapper: CreateBicycleMapper,
    private readonly sparePartMapper: DrizzleSparePartMapper,
  ) {}

  async create(newBicycle: NewBicycle): Promise<void> {
    const insertBicycle = this.createBicycleMapper.fromDomain(newBicycle);

    await this.db.insert(bicycleTable).values(insertBicycle);
  }

  async getAllOrderedByName(): Promise<Bicycle[]> {
    const bicyclesRows = await this.db.query.bicycle.findMany({
      with: {
        model: {
          with: { brand: true },
        },
        sparePart: {
          where: { isMountedOnABicycle: true },
          with: { brand: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return bicyclesRows.map((b) =>
      this.bicycleMapper.toDomain({
        bicycle: b,
        model: b.model,
        brand: b.model.brand,
        spareParts: b.sparePart,
      }),
    );
  }

  async getById(id: string): Promise<Bicycle> {
    const bicycleRow = await this.db.query.bicycle.findFirst({
      with: {
        model: {
          with: { brand: true },
        },
        sparePart: {
          where: { isMountedOnABicycle: true },
          with: { brand: true },
        },
      },
      where: { id },
    });

    if (!bicycleRow) {
      throw new Error('This bicycle id does not exist');
    }

    return this.bicycleMapper.toDomain({
      bicycle: bicycleRow,
      model: bicycleRow.model,
      brand: bicycleRow.model.brand,
      spareParts: bicycleRow.sparePart,
    });
  }

  async save(bicycle: Bicycle): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .insert(bicycleTable)
        .values(this.bicycleMapper.fromDomain(bicycle))
        .onConflictDoUpdate({
          target: bicycleTable.id,
          set: this.bicycleMapper.fromDomain(bicycle),
        });

      const spareParts = bicycle
        .getSpareParts()
        .map((sp) => this.sparePartMapper.fromDomain(sp, bicycle.id));

      for (const sparePart of spareParts) {
        await tx
          .insert(sparePartTable)
          .values(sparePart)
          // This method allow to insert and if the id allready exist the part is update instead
          .onConflictDoUpdate({ target: sparePartTable.id, set: sparePart });
      }
    });
  }
}
