import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // login(@Body() ) {
  //   return this.usersService.login()
  // }

  @Get('findAllUser')
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    const offSet = (page - 1) * size;
    const limit = size;
    return this.usersService.findAll(offSet, limit);
  }

  @Get('getUser/:username')
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne(username);
  }

  @Get('getUserId/:id')
  async findOneId(@Param('id') id: string) {
    return await this.usersService.findOneId(+id);
  }

  @Patch('updateUser/:id')
  @Public()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
