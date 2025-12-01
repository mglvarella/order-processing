import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column('decimal', { precision: 10, scale: 2 })
    value: number;

    @CreateDateColumn()
    creationDate: Date;

    @OneToMany(() => Item, item => item.orderId, { cascade: true })
    items: Item[];
}
