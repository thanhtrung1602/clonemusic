import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Interface user
interface IUser {
  userId: number;
  username: string;
  image: string;
  email: string;
}

// Mở rộng JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: IUser;
    error?: string; // Optional error
  }
}

// Mở rộng Session interface
declare module "next-auth" {
  interface Session {
    user: IUser;
    accessToken: string;
  }
}
