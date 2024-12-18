import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Public } from 'src/decorator/customize';
import { removeVietnameseTones } from 'src/helpers/utils';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post('addPlaylist')
  @Public()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const slug = removeVietnameseTones(createPlaylistDto.playlist_name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    return await this.playlistsService.create(createPlaylistDto, slug);
  }

  @Get('findAllPlaylistUser/:id')
  findAll(@Param('id') id: string) {
    return this.playlistsService.findAll(+id);
  }

  @Get('findAllPlaylistBySlug/:slug')
  findOnePlaylistsSlug(@Param('slug') slug: string) {
    return this.playlistsService.findOnePlaylistsSlug(slug);
  }

  @Patch('updatePlaylist/:id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete('deletePlaylist/:id')
  @Public()
  async remove(@Param('id') id: string) {
    return await this.playlistsService.remove(+id);
  }
}
