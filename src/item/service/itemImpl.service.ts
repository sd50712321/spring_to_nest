import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Item } from '../domain/item';
import { ItemRepositoryImpl } from '../repository/itemRepositoryImpl';
import { ItemService } from './item.service';

@Injectable()
export class ItemServiceImpl implements ItemService {
  constructor(
    @Inject('REDIS') private readonly redis: Redis,
    private itemRepository: ItemRepositoryImpl,
  ) {}

  regist(item: Item): Item {
    const save = this.itemRepository.save2(item);
    return save;
  }

  한글로된함수(abcd) {
    const abc = 'url';
    const 이거이상 = 'test';
    const 이거이상2 = 'test';
    return abcd;
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
}
