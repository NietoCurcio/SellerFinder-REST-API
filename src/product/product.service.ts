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
    // should we create a Comment subdocument? No, when we are dealing with subdocuments it is
    // automatically setted up for us, it comes with _id and .id method as well as remove
    // const createComment: any = await this.commentModel.create(comment);
    // product.comments.push(createComment);
    product.comments.push(comment);
    return product.save();
  }

  async deleteAllComments(id) {
    const prod: any = await this.productModel.findById(id);
    let i = prod.comments.length;
    while (i--) {
      prod.comments[i].remove();
      // or prod.comments.remove(comment);
    }
    return prod.save();
  }

  async updateComment(productId, commentId, update, user) {
    const product: any = await this.productModel.findById(productId);
    const comment = product.comments.id(commentId);
    if (comment) {
      if (!comment.user.equals(user._id)) {
        throw new Error('Action not allowed');
      }
      Object.assign(comment, update);
      return product.save();
    }
  }

  async deleteComment(productId, comment, user) {
    const product: any = await this.productModel.findById(productId);
    if (!product.comments.length) throw new Error('Action not allowed');
    const find = product.comments.id(comment);
    if (!find) throw new Error('Action not allowed');
    // comment = await this.commentModel.findById(comment); (if it were a document, instead of a subdocument)
    if (!user._id.equals(find.user)) throw new Error('Action not allowed');
    find.remove();
    return product.save();
  }

  findAll() {
    return this.productModel
      .find()
      .populate({ path: 'comments.user', model: 'User', select: 'username' });
  }

  findOne(id) {
    return this.productModel
      .findById(id)
      .populate({ path: 'comments.user', model: 'User', select: 'username' });
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

  async remove(id, user) {
    const productDoc = await this.productModel.findById(id);
    if (!user._id.equals(productDoc.user)) {
      throw new Error('Action not allowed');
    }
    return productDoc.remove();
  }
}
