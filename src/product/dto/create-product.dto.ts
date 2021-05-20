import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  description: string;

  @IsNumber()
  price: string;
}
