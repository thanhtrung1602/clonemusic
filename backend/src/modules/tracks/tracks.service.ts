import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createTrackDto: CreateTrackDto,
    image: string,
    sound: string,
    slug: string,
  ) {
    const track = await this.prisma.tracks.create({
      data: {
        track_name: createTrackDto.track_name,
        description: createTrackDto.description,
        slug: slug,
        user_id: Number(createTrackDto.user_id),
        image: image,
        sound: sound,
        genre_id: Number(createTrackDto.genre_id) ?? null,
      },
    });
    return track;
  }

  async findTrackByGenre(id: number, skip: number, take: number) {
    const findGenre = await this.prisma.tracks.findMany({
      where: {
        genre_id: Number(id),
      },
      skip: skip,
      take: Number(take),
    });

    return findGenre;
  }

  async findAllTrack(page: number, limit: number) {
    const findAll = await this.prisma.tracks.findMany({
      skip: Number(page),
      take: Number(limit),
    });
    return findAll;
  }

  async findAllTrackByUsername(username: string) {
    const findAllTrack = await this.prisma.tracks.findMany({
      orderBy: {
        created_at: 'desc',
      },
      where: {
        users: {
          username: username,
        },
      },
      include: {
        users: true,
      },
    });
    return findAllTrack;
  }

  async findOne(slug: string) {
    const findOne = await this.prisma.tracks.findFirst({
      where: {
        slug: slug,
      },
      include: {
        users: true,
      },
    });
    return findOne;
  }

  async update(id: number, updateTrackDto: UpdateTrackDto) {
    const update = await this.prisma.tracks.update({
      where: {
        id,
      },
      data: {
        ...updateTrackDto,
      },
    });

    if (update) {
      return {
        message: 'update successfully!',
      };
    }
  }

  async remove(id: number) {
    const del = await this.prisma.tracks.delete({
      where: {
        id,
      },
    });
    if (del) {
      return {
        message: 'del tracks successfully!',
      };
    }
  }
}
