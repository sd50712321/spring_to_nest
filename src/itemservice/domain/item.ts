import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'string' })
  itemName: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;
}
