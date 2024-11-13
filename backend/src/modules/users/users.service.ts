import { first } from 'rxjs';
import { hashPassword } from 'src/helpers/utils';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
        username: username,
      },
    });

    if (user) {
      throw new HttpException(
        { message: 'This email or username has been used. ' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await hashPassword(createUserDto.password);
    const res = await this.prisma.users.create({
      data: {
        email,
        username,
        password: hashPass,
      },
    });
    return {
      id: res.id,
    };
  }

  async findByEmailOrUsername(emailOrUsername: string) {
    return await this.prisma.users.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createOAuthUser(userData: {
    email: string;
    username: string;
    image: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    return await this.prisma.users.create({
      data: {
        username: userData.username,
        email: userData.email,
        image: userData.image,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
  }

  async handleRegister(user: CreateUserDto) {
    const { email, username, password } = user;
    const users = await this.prisma.users.findUnique({
      where: {
        email: email,
        username: username,
      },
    });

    if (users) {
      throw new HttpException(
        { message: 'This email or username has been used. ' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await hashPassword(password);
    const res = await this.prisma.users.create({
      data: {
        email,
        username,
        password: hashPass,
      },
    });
    return {
      id: res.id,
    };
  }

  async findAll(offSet: number, limit: number) {
    const [data, total] = await Promise.all([
      await this.prisma.users.findMany({
        skip: offSet,
        take: Number(limit),
      }),
      await this.prisma.users.count(),
    ]);
    return {
      data,
      total,
    };
  }

  async findOne(username: string) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOneId(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
