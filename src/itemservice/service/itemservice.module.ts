import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemRepositoryImpl } from '../repository/itemRepositoryImpl';

@Module({
  imports: [DatabaseModule],
  providers: [ItemRepositoryImpl],
})
export class ItemserviceModule {}
