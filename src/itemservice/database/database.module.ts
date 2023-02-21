import { Module } from '@nestjs/common';
import { databaseProviders } from './databaseProvider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
