import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from 'src/auth/guards/auth.decorator';
import { ParamValidation } from './dto/param.validation';
import { Public } from 'src/auth/guards/public.decorator';
import { User } from '../auth/guards/user.decorator';

@Auth('user')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user) {
    return this.productService.create(createProductDto, user);
  }

  @Post('/:id/comments')
  createComment(
    @Param() params: ParamValidation,
    @Body() comment: CreateCommentDto,
    @User() user,
  ) {
    return this.productService.createComment(params.id, comment, user);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param() params: ParamValidation) {
    return this.productService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: ParamValidation,
    @Body() updateProductDto: UpdateProductDto,
    @User() user,
  ) {
    try {
      const update = await this.productService.update(
        params.id,
        updateProductDto,
        user,
      );
      return update;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
