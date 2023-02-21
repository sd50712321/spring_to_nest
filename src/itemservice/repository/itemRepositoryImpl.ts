import { Item } from 'src/itemservice/domain/item';
import { Repository } from 'typeorm';
import { ItemRepository } from './itemRepository';

export class ItemRepositoryImpl
  extends Repository<Item>
  implements ItemRepository
{
  private store: Map<number, Item> = new Map();

  private sequenece = 0;

  save2(item: Item): Item {
    item.id = this.sequenece++;
    this.store.set(item.id, item);
    return item;
  }
}
