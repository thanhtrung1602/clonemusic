import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaClient) {}
  async create(createGenreDto: CreateGenreDto) {
    const createGenre = await this.prisma.genre.create({
      data: {
        title: String(createGenreDto.title),
      },
    });
    return createGenre;
  }

  async findAll() {
    const findAll = await this.prisma.genre.findMany();
    return findAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const update = await this.prisma.genre.update({
      where: {
        id,
      },
      data: {
        ...updateGenreDto,
      },
    });

    if (update) {
      return {
        message: 'update successfully!',
      };
    }
  }

  async remove(id: number) {
    const del = await this.prisma.genre.delete({
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
