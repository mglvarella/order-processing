import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class CreateItemDto {
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
    value: number;

    @IsDateString()
    creationDate: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateItemDto)
    items: CreateItemDto[];
}
