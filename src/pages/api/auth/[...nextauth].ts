import NextAuth from "next-auth/next";
import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import connection from "@/db/connection";
import User from "@/models/UserSchema";

type ICredentialType = {
  username: string;
  email: string;
  password: string;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        connection().catch((error) => {
          return { error: "Connection Failed!" };
        });

        const { email, password } = credentials as ICredentialType;

        const result = await User.findOne({ email: email });
        if (!result) {
          throw new Error("No user found with email, please register!");
        }

        const checkPassword = await compare(password, result?.password);
        if (!checkPassword || email !== result?.email) {
          throw new Error("Username or password doesn't exist!");
        }

        if (result) {
          return result;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
