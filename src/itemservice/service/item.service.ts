import { Item } from '../domain/item';

export interface ItemService {
  regist(item: Item): Item;
}
