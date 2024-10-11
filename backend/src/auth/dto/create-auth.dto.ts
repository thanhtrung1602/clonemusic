import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'username or email cannot be valid' })
  emailOrUsername: string;

  @IsNotEmpty({ message: 'password cannot be valid' })
  password: string;
}
