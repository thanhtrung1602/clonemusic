export class Comment {
  id: number;
  title: string;
  track_id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;

  constructor(
    id: number,
    title: string,
    track_id: number,
    created_at: Date,
    updated_at: Date,
    user_id: number,
  ) {
    this.id = id;
    this.title = title;
    this.track_id = track_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
  }
}
