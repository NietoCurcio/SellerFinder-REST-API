import { ArgumentsHost, ExecutionContext, Injectable } from '@nestjs/common';
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
    return this.productModel.create(product);
  }

  async createComment(id, comment, user) {
    const product = await this.productModel.findById(id);
    comment.user = user._id;
    // should we create a Comment Document?
    // const createComment: any = await this.commentModel.create(comment);
    product.comments.push(comment);
    return product.save();
  }

  findAll() {
    return this.productModel
      .find()
      .populate({ path: 'comments.user', model: 'User', select: 'username' });
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
