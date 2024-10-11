import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './modules/comments/comments.module';
import { GenreModule } from './modules/genre/genre.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TracksModule } from './modules/tracks/tracks.module';
import { LikesModule } from './modules/likes/likes.module';
import { CacheModule } from '@nestjs/cache-manager';
import { FollowsModule } from './modules/follows/follows.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    CommentsModule,
    GenreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    LikesModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
