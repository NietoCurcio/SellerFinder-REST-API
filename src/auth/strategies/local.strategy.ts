import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // "verify" function in passport-local
  async validate(username: string, password: string) {
    const user: any = await this.authService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { _id, username } = user;
        return { _id, username };
      }
    }
    throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
  }
}
