import { Item } from 'src/itemservice/domain/item';

export interface ItemRepository {
  save2(item: Item): Item;
}
