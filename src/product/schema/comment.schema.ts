import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/users.schema';

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
  @Prop()
  @IsString()
  title: string;

  @Prop()
  @IsString()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
