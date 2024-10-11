import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { Public } from 'src/decorator/customize';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('sendLike')
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get('getStatusLike/:slug')
  findAll(@Param('slug') slug: string) {
    return this.likesService.findAll(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Get('getCountLike/:slug')
  @Public()
  findCount(@Param('slug') slug: string) {
    return this.likesService.findCount(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete('unLikeTrack')
  remove(@Body() del: RemoveLikeDto) {
    return this.likesService.remove(del);
  }
}
