import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary/cloudinary.provider';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule, // Chỉ cần nhập RedisModule
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        node: config.get<string>('ELASTICSEARCH_ENDPOINT'),
        auth: {
          apiKey: {
            id: config.get<string>('ID_ELASTICSEARCH'),
            api_key: config.get<string>('API_KEY_ELASTICSEARCH'),
          },
        },
      }),
      inject: [ConfigService],
    }),
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
