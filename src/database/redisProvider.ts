import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import MockRedis from 'ioredis-mock';

export const redisProvider: Provider = {
  provide: 'REDIS',
  useValue:
    process.env.NODE_ENV === 'local'
      ? new MockRedis()
      : new Redis({
          host: 'localhost',
          port: 6379,
        }),
};
