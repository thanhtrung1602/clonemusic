import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { PrismaService } from 'src/prisma.service';
import { RemoveFollowDto } from './dto/remove-follow.dto';

@Injectable()
export class FollowsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFollowDto: CreateFollowDto) {
    const findUnique = await this.prisma.follow.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: Number(createFollowDto.follower_id),
          following_id: Number(createFollowDto.following_id),
        },
      },
    });

    if (findUnique) {
      return {
        message: "you've following",
      };
    }

    const sentFollow = await this.prisma.follow.create({
      data: {
        follower_id: Number(createFollowDto.follower_id),
        following_id: Number(createFollowDto.following_id),
      },
    });

    return sentFollow;
  }

  async findAll(id: number) {
    const statusFollow = await this.prisma.follow.findMany({
      where: {
        following_id: id,
      },
    });
    return statusFollow;
  }

  async remove(remove: RemoveFollowDto) {
    const del = await this.prisma.follow.delete({
      where: {
        follower_id_following_id: {
          follower_id: remove.follower_id,
          following_id: remove.following_id,
        },
      },
    });

    if (del) {
      return {
        message: 'bạn đã hủy follow',
      };
    }
  }
}
