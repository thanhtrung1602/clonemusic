import { ITrack } from "./track";
import { IUser } from "./user";
import {IComment} from "@/types/comment";

export interface ILike {
  id: number;
  track_id: number;
  user_id: number;
  comment_id: number;
  users: IUser;
  tracks: ITrack
  comment: IComment;
  created_at: Date;
}
