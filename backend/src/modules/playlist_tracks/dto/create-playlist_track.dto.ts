import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistTrackDto {
  @Optional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  playlist_id: number;

  @IsNotEmpty()
  @IsNumber()
  track_id: number;
}
