import { Item } from 'src/item/domain/item';

export interface ItemRepository {
  save2(item: Item): Item;
}
