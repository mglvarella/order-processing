import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateItemInputDto {
  @ApiProperty({
    description: 'ID do item informado pelo sistema externo',
    example: '2434',
  })
  @IsString()
  idItem: string;

  @ApiProperty({
    description: 'Quantidade adquirida do item',
    example: 1,
  })
  @IsNumber()
  quantidadeItem: number;

  @ApiProperty({
    description: 'Valor unitário do item',
    example: 1000,
  })
  @IsNumber()
  valorItem: number;
}

export class CreateOrderInputDto {
  @ApiProperty({
    description: 'Código único do pedido vindo do sistema externo',
    example: 'v10089015vdb-01',
  })
  @IsString()
  @IsNotEmpty()
  numeroPedido: string;

  @ApiProperty({
    description: 'Valor total do pedido',
    example: 10000,
  })
  @IsNumber()
  valorTotal: number;

  @ApiProperty({
    description: 'Data e hora da criação do pedido no sistema de origem',
    example: '2023-07-19T12:24:11.5299601+00:00',
  })
  @IsString()
  dataCriacao: string;

  @ApiProperty({
    description: 'Lista dos itens que compõem o pedido',
    type: [CreateItemInputDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInputDto)
  items: CreateItemInputDto[];
}
