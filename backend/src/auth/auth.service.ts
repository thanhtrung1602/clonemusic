import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  generateRandomNumericId,
  removeVietnameseTones,
} from 'src/helpers/utils';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailOrUsername(username);
    console.log('User fetched:', user);
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException();
    }

    const isValidPassword = await comparePassword(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      image: user.image,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin({
    email,
    name,
    photos,
  }: {
    email: string;
    name: string;
    photos: string;
  }): Promise<any> {
    const hashName = removeVietnameseTones(name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const randomId = generateRandomNumericId();
    const username = `${hashName}-${randomId}`;
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createOAuthUser({
        email: email,
        username: username,
        image: photos,
        password: username,
      });
    }

    return this.login(user);
  }

  async handleRegister(user: CreateUserDto) {
    const users = await this.usersService.handleRegister(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return users;
  }
}
