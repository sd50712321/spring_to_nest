import { Module } from '@nestjs/common';
import { mysqlProvider } from './mysqlProvider';
import { redisProvider } from './redisProvider';

@Module({
  providers: [mysqlProvider, redisProvider],
  exports: [mysqlProvider, redisProvider],
})
export class DatabaseModule {}
