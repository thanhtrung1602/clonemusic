import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [GenreController],
  providers: [GenreService, PrismaClient],
})
export class GenreModule {}
