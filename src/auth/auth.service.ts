import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({ username });
  }

  async create(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const created = await this.UserModel.create(user);
    return this.login(created);
  }

  async login(user) {
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
