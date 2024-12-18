import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instance from "./services/axios";
// @ts-ignore
import {IUser} from "./types/next-auth";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                emailOrUsername: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await instance.post("/auth/login", credentials);
                    const user = response.data;

                    if (!user) {
                        throw new Error("User not found.");
                    }

                    return user;
                } catch (error) {
                    error);
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.user = user as IUser;
            }
            return token;
        },
        session({session, token}) {
            (session.user as IUser) = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
