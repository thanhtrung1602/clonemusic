import { IUser } from "./user";

export interface IComment {
  id: number;
  title: string;
  track_id: number;
  user_id: number;
  users: IUser;
  created_at: Date;
}
