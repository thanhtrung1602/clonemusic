import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import instance from "./services/axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        emailOrUsername: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          console.log("check credentials >>>", credentials);
          const response = await instance.post("/auth/login", credentials);
          const user = response.data;

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});
