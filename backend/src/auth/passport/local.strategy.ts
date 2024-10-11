import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'emailOrUsername', // Đảm bảo rằng trường này khớp với request body
      passwordField: 'password',
    });
  }

  async validate(emailOrUsername: string, password: string) {
    const user = await this.authService.validateUser(emailOrUsername, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
