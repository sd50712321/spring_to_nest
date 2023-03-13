import { Item } from '../domain/item';
import { ItemRepositoryImpl } from '../repository/itemRepositoryImpl';
import { ItemService } from './item.service';

export class ItemServiceImpl implements ItemService {
  private itemRepository: ItemRepositoryImpl;

  regist(item: Item): Item {
    const save = this.itemRepository.save2(item);
    return save;
  }
}
