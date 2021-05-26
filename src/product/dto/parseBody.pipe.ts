import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ParseBodyPipe implements PipeTransform<CreateProductDto> {
  transform(data, metadata: ArgumentMetadata): CreateProductDto {
    data.price = Number(data.price);
    if (isNaN(data.price))
      throw new BadRequestException('Price is not a number');
    return data;
  }
}
