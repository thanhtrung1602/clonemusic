import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { RemoveFollowDto } from './dto/remove-follow.dto';
import { Public } from 'src/decorator/customize';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('followed')
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get('getStatusFollow/:id')
  @Public()
  findAll(@Param('id') id: number) {
    return this.followsService.findAll(id);
  }

  @Get('getCountFollowed/:id')
  findCountFollowed(@Param('id') id: number) {
    return this.followsService.findCountFollowed(id);
  }

  @Get('getCountFollowing/:id')
  findCountFollowing(@Param('id') id: number) {
    return this.followsService.findCountFollowing(id);
  }

  @Post('unFollow')
  remove(@Body() remove: RemoveFollowDto) {
    return this.followsService.remove(remove);
  }
}
