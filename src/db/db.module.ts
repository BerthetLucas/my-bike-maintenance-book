import { Global, Module } from '@nestjs/common';
import { dbProvider } from 'src/db/db.provider';

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
