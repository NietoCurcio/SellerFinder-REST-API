import { ArgumentsHost, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  create(product: CreateProductDto, user) {
    product.user = user._id;
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
    return this.productModel.findById(id);
  }

  async update(id, product, user) {
    const productDoc = await this.productModel.findById(id);
    if (!user._id.equals(productDoc.user)) {
      throw new Error('Action not allowed');
    }
    // does not create a new object, let newObject = {...target, source} === Object.assign({}, target, source)
    // so notice to simulate the spread operator,
    // in order to create a new object, we would pass an empty object {}
    Object.assign(productDoc, product);
    return productDoc.save();
  }

  remove(id) {
    return `This action removes a #${id} product`;
  }
}
