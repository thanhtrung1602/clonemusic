import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { RemoveFollowDto } from './dto/remove-follow.dto';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get('getStatusFollow/:id')
  findAll(@Param('id') id: number) {
    return this.followsService.findAll(id);
  }

  @Delete('unFollow')
  remove(@Body() remove: RemoveFollowDto) {
    return this.followsService.remove(remove);
  }
}
