import { IPlaylist } from "./playlist";
import { ITrack } from "./track";

export interface IPlaylistDetail {
  id: number;
  description: string;
  playlist_id: number;
  track_id: number;
  tracks: ITrack;
  playlists: IPlaylist;
}
