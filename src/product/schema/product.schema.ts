import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/users.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'no-image' })
  image: string;

  @Prop()
  price: number;

  @Prop({ min: 0, default: 0 })
  soldQuantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  // Subdocuments
  @Prop()
  comments: [Comment];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
