import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  UsePipes,
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
import { CommentParamValidation } from './dto/param.comment.validation';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { ParseBodyPipe } from './dto/parseBody.pipe';

@Auth('user')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  // @UsePipes(new ParseBodyPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) =>
          cb(null, join(__dirname, '..', '..', 'public', 'images')),
        filename: (req, file, cb) => {
          cb(
            null,
            file.fieldname +
              '-' +
              Date.now() +
              '-' +
              Math.round(Math.random() * 1e9) +
              '-' +
              file.originalname,
          );
        },
      }),
    }),
  )
  create(
    @Body(new ParseBodyPipe()) createProductDto: CreateProductDto,
    @User() user,
    @UploadedFile() file,
  ) {
    if (file) createProductDto.image = file.filename;
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

  @Put('/:id/comments/:commentId')
  updateComment(
    @Param() params: CommentParamValidation,
    @Body() comment: UpdateCommentDto,
    @User() user,
  ) {
    return this.productService.updateComment(
      params.id,
      params.commentId,
      comment,
      user,
    );
  }

  @Delete('/:id/comments/:commentId')
  async deleteComment(@Param() params: CommentParamValidation, @User() user) {
    try {
      const remove = await this.productService.deleteComment(
        params.id,
        params.commentId,
        user,
      );
      return remove;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
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
  async remove(@Param() params: ParamValidation, @User() user) {
    try {
      const removed = await this.productService.remove(params.id, user);
      return removed;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
