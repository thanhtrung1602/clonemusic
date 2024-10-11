import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
const CLOUDINARY = 'cloudinary';
@Injectable()
export class CloudinaryProvider {
  constructor(private configService: ConfigService) {}
  provide = CLOUDINARY;
  useFactory = (): ConfigOptions => {
    return cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  };
}
