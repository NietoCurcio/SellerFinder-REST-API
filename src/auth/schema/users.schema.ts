import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ unique: true })
  @IsString()
  username: string;

  @Prop()
  @IsString()
  password: string;

  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop({ default: false })
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
