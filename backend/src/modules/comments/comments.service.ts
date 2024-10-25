import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto) {
    const sendComment = await this.prisma.comment.create({
      data: {
        title: createCommentDto.title,
        user_id: createCommentDto.user_id,
        track_id: createCommentDto.track_id,
      },
    });
    console.log('create: ', sendComment);
    return sendComment;
  }

  async findAll(id: number) {
    try {
      console.log('id: ', id);
      const findAllCommentByTrack = await this.prisma.comment.findMany({
        where: {
          track_id: Number(id),
        },
        include: {
          users: true,
        },
      });
      console.log('findAll: ', findAllCommentByTrack);
      return findAllCommentByTrack;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const del = await this.prisma.comment.delete({
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
