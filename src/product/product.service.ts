import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(product: CreateProductDto) {
    console.log(product);
    console.log(Object.getPrototypeOf(product));
    return this.productModel.create(product);
  }

  findAll() {
    return this.productModel
      .find()
      .populate({ path: 'comments', populate: { path: 'user' } });
  }

  findOne(id) {
    return `This action returns a #${id} product`;
  }

  update(id, product: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id) {
    return `This action removes a #${id} product`;
  }
}
