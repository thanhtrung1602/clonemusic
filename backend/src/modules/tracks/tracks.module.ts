import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary/cloudinary.provider';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule, // Chỉ cần nhập RedisModule
  ],
  controllers: [TracksController],
  providers: [
    TracksService,
    CloudinaryProvider,
    CloudinaryService,
    PrismaService,
    RedisService,
  ],
})
export class TracksModule {}
