import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto) {
    const findUnique = await this.prisma.like_track.findUnique({
      where: {
        track_id_user_id: {
          track_id: createLikeDto.track_id,
          user_id: createLikeDto.user_id,
        },
      },
    });

    if (findUnique) {
      return {
        message: "you've liked",
      };
    }

    const sendLike = await this.prisma.like_track.create({
      data: {
        track_id: createLikeDto.track_id,
        user_id: createLikeDto.user_id,
      },
    });
    return sendLike;
  }

  async findAll(slug: string) {
    const findAllLike = await this.prisma.like_track.findMany({
      where: {
        tracks: {
          slug: slug,
        },
      },
      include: {
        tracks: true,
      },
    });
    return findAllLike;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  async findCount(slug: string) {
    const count = await this.prisma.like_track.count({
      where: {
        tracks: {
          slug: slug,
        },
      },
    });
    return count;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  async remove(del: RemoveLikeDto) {
    const remove = await this.prisma.like_track.delete({
      where: {
        track_id_user_id: {
          track_id: del.track_id,
          user_id: del.user_id,
        },
      },
    });

    if (remove) {
      return {
        message: 'del successfully!',
      };
    }
  }
}
