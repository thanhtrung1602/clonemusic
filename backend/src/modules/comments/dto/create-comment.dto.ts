import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  track_id: number;

  @IsNotEmpty()
  user_id: number;
}
