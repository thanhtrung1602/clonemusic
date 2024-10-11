export class Track {
  id: number;
  track_name: string;
  sound: string;
  image: string;
  description: string;
  user_id: number;
  genre_id: number;

  constructor(
    id: number,
    track_name: string,
    sound: string,
    image: string,
    description: string,
    user_id: number,
    genre_id: number,
  ) {
    this.id = id;
    this.track_name = track_name;
    this.sound = sound;
    this.image = image;
    this.description = description;
    this.user_id = user_id;
    this.genre_id = genre_id;
  }
}
