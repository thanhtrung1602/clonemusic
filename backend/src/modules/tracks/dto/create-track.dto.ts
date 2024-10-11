import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  track_name: string;

  sound: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  slug: string;

  @IsNotEmpty({ message: "You're not login" })
  user_id: number;

  @IsOptional()
  genre_id?: number;
}
