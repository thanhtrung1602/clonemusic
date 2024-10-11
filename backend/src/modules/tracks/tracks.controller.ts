import { CloudinaryService } from './../../cloudinary/cloudinary.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Public } from 'src/decorator/customize';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { removeVietnameseTones } from 'src/helpers/utils';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RedisService } from 'src/redis/redis.service';
import { of } from 'rxjs';
import { get } from 'http';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly cloudinaryService: CloudinaryService,
    private client: ElasticsearchService,
    private readonly cache: RedisService,
  ) {}

  @Post('createTrack')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'sound', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  @Public()
  async create(
    @UploadedFiles()
    files: { sound: Express.Multer.File; image?: Express.Multer.File },
    @Body() createTrackDto: CreateTrackDto,
  ) {
    const soundFile = files.sound?.[0];
    const imageFile = files.image?.[0];

    const soundUploadResult = soundFile
      ? await this.cloudinaryService.uploadFile(soundFile)
      : null;
    const imageUploadResult = imageFile
      ? await this.cloudinaryService.uploadFile(imageFile)
      : null;

    const slug = removeVietnameseTones(createTrackDto.track_name)
      .toLowerCase()
      .replace(/\s+/g, '-');
    const image = imageUploadResult.url;
    const sound = soundUploadResult.url;
    const track = await this.tracksService.create(
      createTrackDto,
      image,
      sound,
      slug,
    );
    await this.client.index({
      index: 'tracks',
      id: track.id.toString(),
      document: {
        track_name: track.track_name,
        image: track.image,
      },
    });
    return track;
  }

  @Get('findTrackByGenre/:id')
  @Public()
  async findTrackByGenre(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const skip = page || 1;
    const take = limit || 10;

    const offSet = (skip - 1) * take;

    const findGenre = await this.tracksService.findTrackByGenre(
      id,
      offSet,
      take,
    );

    return findGenre;
  }

  @Get('findAllTrack')
  @Public()
  async findAllTrack(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const skip = page || 1;
    const take = limit || 10;

    const offSet = (skip - 1) * take;

    return await this.tracksService.findAllTrack(offSet, take);
  }

  @Get('findAllTrackByUsername/:username')
  @Public()
  findAllTrackByUsername(@Param('username') username: string) {
    return this.tracksService.findAllTrackByUsername(username);
  }

  @Get('search')
  @Public()
  async search(@Query('q') q: string) {
    const result = await this.client.search({
      index: 'tracks',
      query: {
        match: {
          track_name: q,
        },
      },
    });

    return result.hits.hits;
  }

  @Get('findOneSlug/:slug')
  @Public()
  async findOne(@Param('slug') slug: string) {
    const cacheProduct = await this.cache.get(`products_${slug}`);
    if (cacheProduct) {
      return JSON.parse(cacheProduct);
    }
    const findOne = await this.tracksService.findOne(slug);

    if (findOne) {
      await this.cache.set(`products_${slug}`, findOne);
    }

    return findOne;
  }

  @Patch('updateTrack/:id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @Delete('delTrack/:id')
  @Public()
  remove(@Param('id') id: string) {
    return this.tracksService.remove(+id);
  }
}