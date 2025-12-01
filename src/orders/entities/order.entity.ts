import { Entity, Column, OneToMany, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Order {
  @PrimaryColumn()
  orderId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn()
  creationDate: Date;

  @OneToMany(() => Item, item => item.order, { cascade: true })
  items: Item[];
}
