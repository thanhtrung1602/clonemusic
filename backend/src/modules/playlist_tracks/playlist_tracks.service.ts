import { Injectable } from '@nestjs/common';
import { CreatePlaylistTrackDto } from './dto/create-playlist_track.dto';
import { UpdatePlaylistTrackDto } from './dto/update-playlist_track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistTracksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPlaylistTrackDto: CreatePlaylistTrackDto) {
    const playlistExists = await this.prisma.playlists.findUnique({
      where: { id: createPlaylistTrackDto.playlist_id },
    });
    const trackExists = await this.prisma.tracks.findUnique({
      where: { id: createPlaylistTrackDto.track_id },
    });

    if (!playlistExists || !trackExists) {
      throw new Error('Invalid playlist or track ID');
    }

    const create = await this.prisma.playlist_track.create({
      data: {
        ...createPlaylistTrackDto,
      },
    });
    return create;
  }

  async findAll(id: number) {
    const findAll = await this.prisma.playlist_track.findMany({
      where: {
        playlist_id: id,
      },
      include: {
        tracks: {
          include: {
            users: true,
          },
        },
        playlists: true,
      },
    });
    return findAll;
  }

  async findAllCountPlaylist(id: number) {
    const count = await this.prisma.playlist_track.count({
      where: {
        playlist_id: id,
      },
    });

    return count;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistTrack`;
  }

  update(id: number, updatePlaylistTrackDto: UpdatePlaylistTrackDto) {
    return `This action updates a #${id} playlistTrack`;
  }

  async remove(id: number) {
    await this.prisma.playlist_track.delete({
      where: {
        id: id,
      },
    });
    return `This action removes a #${id} playlistTrack`;
  }
}
