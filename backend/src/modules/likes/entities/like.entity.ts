export class Like {
  id: number;
  track_id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  comment_id: number;

  constructor(
    id: number,
    track_id: number,
    created_at: Date,
    updated_at: Date,
    user_id: number,
    comment_id: number
  ) {
    this.id = id;
    this.track_id = track_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
    this.comment_id = comment_id;
  }
}
