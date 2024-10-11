import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './create-like.dto';

export class RemoveLikeDto extends PartialType(CreateLikeDto) {}
