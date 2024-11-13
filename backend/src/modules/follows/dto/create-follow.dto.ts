import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsNumber()
  follower_id: number;

  @IsNotEmpty()
  @IsNumber()
  following_id: number;
}
