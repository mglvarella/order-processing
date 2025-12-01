import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Item {
    @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    orderId: Order;

    @PrimaryColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}
