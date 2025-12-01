import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './entities/item.entity';
import { Order } from './entities/order.entity';

import { CreateOrderInputDto } from './dto/input-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { mapPedido } from './mappers/order.mapper';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createOrderInputDto: CreateOrderInputDto) {
    const mapped = mapPedido(createOrderInputDto);

    const { orderId, items, value, creationDate } = mapped;

    const alreadyExists = await this.orderRepository.exists({
      where: { orderId },
    });

    if (alreadyExists) {
      throw new ConflictException(`Order ${orderId} already exists`);
    }

    const order = this.orderRepository.create({
      orderId,
      value,
      creationDate,
      items: items.map(i => this.itemRepository.create(i)),
    });

    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates order #${id}`;
  }

  async remove(id: string) {
    const exists = await this.orderRepository.exists({
      where: { orderId: id },
    });

    if (!exists) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    await this.orderRepository.delete({ orderId: id });

    return { message: `Order #${id} deleted successfully` };
  }
}
