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
  @Public()
  async create(@Body() createLikeDto: CreateLikeDto) {
    'body: ', createLikeDto);
    return await this.likesService.create(createLikeDto);
  }

  @Post('sendLikeComment')
  @Public()
  async createLikeComment(@Body() createLikeDto: CreateLikeDto) {
    'body: ', createLikeDto);
    return await this.likesService.createLikeComment(createLikeDto);
  }

  @Get('getStatusLike/:id')
  @Public()
  findAll(@Param('id') id: number) {
    return this.likesService.findAll(id);
  }

  @Get('getStatusLikeComment/:id')
  @Public()
  findAllLikeComment(@Param('id') id: number) {
    return this.likesService.findAllLikeComment(id);
  }

  @Get('getCountLike/:id')
  @Public()
  async findCount(@Param('id') id: number) {
    return await this.likesService.findCount(id);
  }

  @Get('getCountLikeComment/:id')
  @Public()
  async findCountComment(@Param('id') id: number) {
    return await this.likesService.findCountComment(id);
  }


  @Post('unLikeTrack')
  async remove(@Body() del: RemoveLikeDto) {
    return await this.likesService.remove(del);
  }

  @Post('unLikeTrackComment')
  async removeLikeComment(@Body() del: RemoveLikeDto) {
    return await this.likesService.removeLikeComment(del);
  }
}
