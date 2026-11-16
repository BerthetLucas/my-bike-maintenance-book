import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import { CreateSparePartMapper } from './mappers/create-spare-part.mapper';
import { NewSparePart } from './models/new-spare-part.model';
import { sparePart as sparePartTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SparePartRepository {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly createSparePartMapper: CreateSparePartMapper,
  ) {}

  async create(newSparePart: NewSparePart): Promise<void> {
    const sparePartToInsert =
      this.createSparePartMapper.fromDomain(newSparePart);

    await this.db.insert(sparePartTable).values(sparePartToInsert);
  }

  async detacheSparePartFromBicycle(id: string): Promise<void> {
    const sparePartToDetached = await this.db.query.sparePart.findFirst({
      where: { id },
    });

    if (!sparePartToDetached) {
      throw new Error('This spare part does not exist');
    }

    await this.db
      .update(sparePartTable)
      .set({ isMountedOnABicycle: false })
      .where(eq(sparePartTable.id, sparePartToDetached.id));
  }
}
