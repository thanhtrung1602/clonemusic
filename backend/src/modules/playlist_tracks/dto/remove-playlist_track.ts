import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistTrackDto } from './create-playlist_track.dto';

export class RemovePlaylistTrackDto extends PartialType(
  CreatePlaylistTrackDto,
) {}
