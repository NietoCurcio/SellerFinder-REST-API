import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ParamValidation } from './param.validation';

export class CommentParamValidation extends ParamValidation {
  constructor() {
    super();
  }
  @IsMongoId()
  commentId: ObjectId;
}
