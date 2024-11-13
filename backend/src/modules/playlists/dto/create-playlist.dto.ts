import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  playlist_name: string;

  @Optional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
