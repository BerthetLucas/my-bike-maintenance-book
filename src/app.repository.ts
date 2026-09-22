import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { InjectDb } from './db.provider';
import { hello_pg_table } from './db/schema';
import type { DB } from 'src';

@Injectable()
export class AppRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async insert(name: string) {
    await this.db.insert(hello_pg_table).values({ name });
  }

  async findByName(name: string) {
    const [result] = await this.db
      .select()
      .from(hello_pg_table)
      .where(eq(hello_pg_table.name, name));

    return result;
  }
}
