export class PlaylistTrack {
  id: number;
  description: string;
  playlist_id: number;
  track_id: number;

  constructor(
    id: number,
    description: string,
    playlist_id: number,
    track_id: number,
  ) {
    this.id = id;
    this.description = description;
    this.playlist_id = playlist_id;
    this.track_id = track_id;
  }
}
