import { IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdateItemDto {
  @ApiPropertyOptional({
    description: 'Novo ID do produto (opcional)',
    example: 2434,
  })
  @IsNumber()
  @IsOptional()
  productId?: number;

  @ApiPropertyOptional({
    description: 'Nova quantidade do item (opcional)',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Novo preço do item (opcional)',
    example: 1500,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Novo valor total do pedido (opcional)',
    example: 15000,
  })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiPropertyOptional({
    description: 'Lista de itens atualizados (opcional)',
    type: [UpdateItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItemDto)
  @IsOptional()
  items?: UpdateItemDto[];
}
