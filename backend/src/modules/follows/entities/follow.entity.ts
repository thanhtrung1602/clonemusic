export class Follow {
  follower_id: number;
  following_id: number;

  constructor(follower_id: number, following_id: number) {
    this.follower_id = follower_id;
    this.following_id = following_id;
  }
}
