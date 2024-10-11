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
    return sendComment;
  }

  async findAll(slug: string) {
    const findAllCommentByTrack = await this.prisma.comment.findMany({
      where: {
        tracks: {
          slug: slug,
        },
      },

      include: {
        tracks: true,
      },
    });

    return findAllCommentByTrack;
  }

  async remove(id: number) {
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
  }
}
