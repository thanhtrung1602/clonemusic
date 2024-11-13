import { IUser } from "./user";

export interface IPlaylist {
  id: number;
  image: string;
  playlist_name: string;
  user_id: number;
  users: IUser;
}
