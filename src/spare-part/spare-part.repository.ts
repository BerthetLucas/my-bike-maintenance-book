import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import { CreateSparePartMapper } from './mappers/create-spare-part.mapper';
import { NewSparePart } from './models/new-spare-part.model';
import { sparePart as sparePartTable } from 'src/db/schema';

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
}
