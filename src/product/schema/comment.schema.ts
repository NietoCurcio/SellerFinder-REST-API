import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/users.schema';

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
  @Prop()
  title: string;

  @Prop()
  comment: string;

  // So noticed that, Product has Comment subdocuments and Comment has user ObjectId reference
  // Product -> (subdocuments) Comment -> (ObjectId ref) User
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
