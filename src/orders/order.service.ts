import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { orderId, items, value } = createOrderDto;

    const alreadyExists = await this.orderRepository.exists({
      where: { orderId },
    });

    if (alreadyExists) {
      throw new ConflictException(`Order ${orderId} already exists`);
    }

    const order = this.orderRepository.create({
      orderId,
      value,
      creationDate: new Date(),
      items: items.map(i => this.itemRepository.create(i)),
    });

    const savedOrder = await this.orderRepository.save(order);

    return savedOrder;
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {

    const checkIfExists = await this.orderRepository.exists({
      where: { orderId: id },
    });

    if (!checkIfExists) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    
    await this.orderRepository.delete({ orderId: id });
  }
}
