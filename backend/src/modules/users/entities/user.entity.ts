export class User {
  id: number;
  username: string;
  image: string;
  email: string;
  password: string;
  constructor(
    id: number,
    username: string,
    image: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.username = username;
    this.image = image;
    this.email = email;
    this.password = password;
  }
}
