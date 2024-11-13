export class Playlist {
  id: number;
  playlist_name: string;
  image: string;
  user_id: number;
  slug: string;

  constructor(
    id: number,
    playlist_name: string,
    image: string,
    user_id: number,
    slug: string,
  ) {
    this.id = id;
    this.playlist_name = playlist_name;
    this.image = image;
    this.user_id = user_id;
    this.slug = slug;
  }
}
