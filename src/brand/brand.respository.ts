import { Injectable } from '@nestjs/common';
import type { DB } from '../index';
import { InjectDb } from 'src/db/db.provider';
import { Brand, NewBrand } from './brand.model';
import { DrizzleBrandMapper, DrizzleNewBrandMapper } from './brand.mapper';
import { brand } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly createBrandMapper: DrizzleNewBrandMapper,
    private readonly brandMapper: DrizzleBrandMapper,
  ) {}

  async create(newBrand: NewBrand) {
    const brandToInsert = this.createBrandMapper.fromDomain(newBrand);

    return await this.db.insert(brand).values(brandToInsert);
  }

  async getOne(id: string): Promise<Brand> {
    const [row] = await this.db.select().from(brand).where(eq(brand.id, id));

    const uniqBrand = this.brandMapper.toDomain(row);

    return uniqBrand;
  }

  async getAll() {
    const brands = await this.db.select().from(brand);

    return brands.map((b) => this.brandMapper.toDomain(b));
  }
}
