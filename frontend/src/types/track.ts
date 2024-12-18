import { IUser } from "./user";

export interface ITrack {
  id: number;
  created_at: Date;
  description: string;
  genre_id: number;
  image: string;
  slug: string;
  sound: string;
  track_name: string;
  user_id: number;
  users: IUser;
}
