import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty({ message: 'username cannot be empty' })
  username: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;
}
