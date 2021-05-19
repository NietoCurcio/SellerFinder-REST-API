import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy, VerifyFunction } from 'passport-google-oauth';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  // "verify" function in passport-local
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ): Promise<any> {
    const firstname = profile.name.givenName;
    const lastname = profile.name.familyName;
    const email = profile.emails[0].value;
    const user = { firstname, lastname, email };
    done(null, user);
  }
}
