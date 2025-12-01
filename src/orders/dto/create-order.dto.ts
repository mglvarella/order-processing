import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class CreateItemDto {
    @IsNumber()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateItemDto)
    items: CreateItemDto[];
}
