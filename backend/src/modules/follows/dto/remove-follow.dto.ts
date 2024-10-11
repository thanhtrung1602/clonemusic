import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowDto } from './create-follow.dto';

export class RemoveFollowDto extends PartialType(CreateFollowDto) {}
