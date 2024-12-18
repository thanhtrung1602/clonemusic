import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPlaylistDto: CreatePlaylistDto, baseSlug: string) {
    let slug = baseSlug;
    let suffix = 1;

    let existingSlug = await this.prisma.playlists.findFirst({
      where: {
        slug: slug,
      },
    });

    while (existingSlug) {
      slug = `${baseSlug}-${suffix}`;
      suffix++;
      existingSlug = await this.prisma.playlists.findFirst({
        where: {
          slug: slug,
        },
      });
    }
    const create = await this.prisma.playlists.create({
      data: {
        playlist_name: createPlaylistDto.playlist_name,
        image: createPlaylistDto.image,
        users: {
          connect: { id: createPlaylistDto.user_id },
        },
        slug: slug,
      },
    });
    return create;
  }

  async findAll(id: number) {
    const findAll = await this.prisma.playlists.findMany({
      where: {
        user_id: id,
      },

      include: {
        users: true,
      },
    });
    return findAll;
  }

  async findOnePlaylistsSlug(slug: string) {
    const findAll = await this.prisma.playlists.findFirst({
      where: {
        slug: slug,
      },

      include: {
        users: true,
      },
    });
    return findAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  async remove(id: number) {
    await this.prisma.playlists.delete({
      where: {
        id,
      },
    });

    await this.prisma.playlist_track.deleteMany({
      where: {
        playlist_id: Number(id),
      },
    });
    return `This action removes a #${id} playlist`;
  }
}
