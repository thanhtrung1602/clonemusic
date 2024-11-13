import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from 'src/decorator/customize';
import { GoogleAuthGuard } from './passport/google-auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response() res) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    if (access_token) {
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Login is Successfully!' });
    }
  }

  @Post('register')
  @Public()
  register(@Request() req) {
    console.log(req.body);
    return this.authService.handleRegister(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('User from token:', req.user);
    return req.user;
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('google/return_api')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req, @Response() res) {
    const { access_token } = req.user;
    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    if (access_token) {
      return res.redirect(this.configService.get<string>('HOST_CLIENT'));
    }
  }

  @Get('getAccessToken')
  @Public()
  getAccessToken(@Request() req, @Response() res) {
    const { accessToken } = req.cookies;
    const sessionToken = req.cookies['accessToken'];

    if (!accessToken) {
      if (sessionToken) {
        return res.status(200).json(sessionToken);
      }
      return res.status(404).json('not found token!');
    } else {
      return res.status(200).json(accessToken);
    }
  }
}
