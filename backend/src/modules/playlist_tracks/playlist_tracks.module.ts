import { Module } from '@nestjs/common';
import { PlaylistTracksService } from './playlist_tracks.service';
import { PlaylistTracksController } from './playlist_tracks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlaylistTracksController],
  providers: [PlaylistTracksService, PrismaService],
})
export class PlaylistTracksModule {}
