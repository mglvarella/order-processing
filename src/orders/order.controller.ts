import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './order.service';

import { CreateOrderInputDto } from './dto/input-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Orders')   // Agrupa as rotas no Swagger
@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiCreatedResponse({ description: 'Pedido criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'Pedido já existe.' })
  @ApiBody({ type: CreateOrderInputDto })
  create(@Body() createOrderInputDto: CreateOrderInputDto) {
    return this.ordersService.create(createOrderInputDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  @ApiOkResponse({ description: 'Lista de pedidos retornada com sucesso.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um pedido pelo ID' })
  @ApiOkResponse({ description: 'Pedido encontrado.' })
  @ApiNotFoundResponse({ description: 'Pedido não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um pedido' })
  @ApiOkResponse({ description: 'Pedido atualizado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Pedido não encontrado.' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um pedido pelo ID' })
  @ApiOkResponse({ description: 'Pedido removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Pedido não encontrado.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
