import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

class CreateItemInputDto {
  @IsString()
  idItem: string;

  @IsNumber()
  quantidadeItem: number;

  @IsNumber()
  valorItem: number;
}

export class CreateOrderInputDto {
  @IsString()
  @IsNotEmpty()
  numeroPedido: string;

  @IsNumber()
  valorTotal: number;

  @IsString()
  dataCriacao: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInputDto)
  items: CreateItemInputDto[];
}
