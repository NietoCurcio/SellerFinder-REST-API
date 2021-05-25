import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from './guards/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() user: CreateUserDto) {
    try {
      const created = await this.authService.create(user);
      return created;
    } catch (err) {
      throw new ForbiddenException(
        'Could not sign up, username already exists - ' + err.message,
      );
    }
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google')
  async googleAuth(@Req() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('/google/redirect')
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }

  // "Unknown authentication strategy "jwt"", if JwtStrategy is not in auth.controller module context
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUser(@Req() req) {
    return req.user;
  }
}
