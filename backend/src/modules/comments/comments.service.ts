import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const sendComment: Comment = await this.prisma.comment.create({
      data: {
        title: createCommentDto.title,
        user_id: createCommentDto.user_id,
        track_id: createCommentDto.track_id,
      },
    });
    return sendComment;
  }

  async findAll(id: number) {
    try {
      const findAllCommentByTrack: Comment[] =
        await this.prisma.comment.findMany({
          orderBy: {
            created_at: 'desc',
          },
          where: {
            track_id: Number(id),
          },
          include: {
            users: true,
          },
        });
      return findAllCommentByTrack;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllCount(id: number) {
    try {
      const findAllCountComment: number = await this.prisma.comment.count({
        where: {
          track_id: Number(id),
        },
      });
      return findAllCountComment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const del: Comment = await this.prisma.comment.delete({
        where: {
          id,
        },
      });

      if (del) {
        return {
          message: 'del successfully!',
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
