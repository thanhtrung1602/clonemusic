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
          track_id: Number(createLikeDto.track_id),
          user_id: Number(createLikeDto.user_id),
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
        track_id: Number(createLikeDto.track_id),
        user_id: Number(createLikeDto.user_id),
      },
    });
    return sendLike;
  }

  async createLikeComment(createLikeDto: CreateLikeDto) {
    const findUnique = await this.prisma.like_track.findUnique({
      where: {
        comment_id_user_id: {
          comment_id: Number(createLikeDto.comment_id),
          user_id: Number(createLikeDto.user_id),
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
        comment_id: Number(createLikeDto.comment_id),
        user_id: Number(createLikeDto.user_id),
      },
    });
    return sendLike;
  }

  async findAll(id: number) {
    const findAllLike = await this.prisma.like_track.findMany({
      where: {
        track_id: Number(id),
      },
      include: {
        tracks: true,
        users: true,
      },
    });
    return findAllLike;
  }

  async findAllLikeComment(id: number) {
    const findAllLike = await this.prisma.like_track.findMany({
      where: {
        comment_id: Number(id),
      },
      include: {
        comment: true,
        users: true,
      },
    });
    return findAllLike;
  }


  async findCount(id: number) {
    const count = await this.prisma.like_track.count({
      where: {
        track_id: Number(id),
      },
    });
    return count;
  }

  async findCountComment(id: number) {
    const count = await this.prisma.like_track.count({
      where: {
        comment_id: Number(id),
      },
    });
    return count;
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

  async removeLikeComment(del: RemoveLikeDto) {
    const remove = await this.prisma.like_track.delete({
      where: {
        comment_id_user_id: {
          comment_id: del.comment_id,
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
