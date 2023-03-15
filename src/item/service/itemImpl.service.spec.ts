import { Test } from '@nestjs/testing';
import { ItemServiceImpl } from './itemImpl.service';
import { Item } from '../domain/item';
import { ItemRepositoryImpl } from '../repository/itemRepositoryImpl';
import { Redis } from 'ioredis';

describe('ItemServiceImpl', () => {
  let itemService: ItemServiceImpl;
  let itemRepository: ItemRepositoryImpl;
  let redis: Redis;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemServiceImpl,
        {
          provide: ItemRepositoryImpl,
          useValue: {
            save2: jest.fn(),
          },
        },
        {
          provide: 'REDIS',
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    itemService = moduleRef.get<ItemServiceImpl>(ItemServiceImpl);
    itemRepository = moduleRef.get<ItemRepositoryImpl>(ItemRepositoryImpl);
    redis = moduleRef.get<Redis>('REDIS');
  });

  describe('regist', () => {
    it('should call ItemRepositoryImpl.save2 method and return the saved item', () => {
      const item: Item = {
        id: 1,
        itemName: 'itemName',
        price: 1000,
        quantity: 1,
      };
      itemRepository.save2 = jest.fn().mockReturnValue(item);

      const result = itemService.regist(item);

      expect(itemRepository.save2).toHaveBeenCalledWith(item);
      expect(result).toEqual(item);
    });
  });

  describe('set', () => {
    it('should set the value to Redis database with given key', async () => {
      const key = 'key1';
      const value = 'value1';

      await itemService.set(key, value);

      expect(redis.set).toHaveBeenCalledWith(key, value);
    });
  });

  describe('get', () => {
    it('should return the value from Redis database with given key', async () => {
      const key = 'key1';
      const value = 'value1';

      (redis.get as jest.Mock).mockResolvedValue(value);

      const result = await itemService.get(key);

      expect(redis.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(value);
    });

    it('should return null if the key does not exist', async () => {
      const key = 'key2';

      (redis.get as jest.Mock).mockResolvedValue(null);

      const result = await itemService.get(key);

      expect(redis.get).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });
  });
});
