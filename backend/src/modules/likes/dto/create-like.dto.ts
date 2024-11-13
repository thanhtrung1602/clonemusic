import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  track_id?: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNumber()
  comment_id?: number;
}
