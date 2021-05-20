import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ParamValidation {
  @IsMongoId()
  id: ObjectId;
}
