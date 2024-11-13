import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistTracksService } from './playlist_tracks.service';
import { CreatePlaylistTrackDto } from './dto/create-playlist_track.dto';
import { UpdatePlaylistTrackDto } from './dto/update-playlist_track.dto';
import { Public } from 'src/decorator/customize';

@Controller('playlist-tracks')
export class PlaylistTracksController {
  constructor(private readonly playlistTracksService: PlaylistTracksService) {}

  @Post('createPlaylistDetail')
  @Public()
  async create(@Body() createPlaylistTrackDto: CreatePlaylistTrackDto) {
    return await this.playlistTracksService.create(createPlaylistTrackDto);
  }

  @Get('findAll/:id')
  async findAll(@Param('id') id: string) {
    return this.playlistTracksService.findAll(+id);
  }

  @Get('findAllCountPlaylistUser/:id')
  findAllCountPlaylist(@Param('id') id: string) {
    return this.playlistTracksService.findAllCountPlaylist(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistTracksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistTrackDto: UpdatePlaylistTrackDto,
  ) {
    return this.playlistTracksService.update(+id, updatePlaylistTrackDto);
  }

  @Delete('deletePlaylistTrack/:id')
  async remove(@Param('id') id: string) {
    return await this.playlistTracksService.remove(+id);
  }
}
