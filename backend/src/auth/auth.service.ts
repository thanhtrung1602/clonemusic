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
  hashPassword,
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
    'User fetched:', user);
    if (!user) {
      'User not found');
      throw new UnauthorizedException();
    }

    const isValidPassword = await comparePassword(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: any) {
    'User before login:', user);
    const payload = {
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin({
    email,
    name,
    photos,
    firstName,
    lastName,
  }: {
    email: string;
    name: string;
    photos: string;
    firstName: string;
    lastName: string;
  }): Promise<any> {
    const hashName = removeVietnameseTones(name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const randomId = generateRandomNumericId();
    const username = `${hashName}-${randomId}`;
    const hashPass = await hashPassword(username);
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createOAuthUser({
        email: email,
        username: username,
        image: photos,
        password: hashPass,
        firstName: firstName,
        lastName: lastName,
      });
    }

    return await this.login(user);
  }

  async handleRegister(user: CreateUserDto) {
    const users = await this.usersService.handleRegister(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return users;
  }
}
