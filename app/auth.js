import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfg";
import { User } from "./lib/models";
import bcrypt from "bcrypt";
import connectToDB from "./lib/utils";


export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                try {
                    ("Auth..");
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ]
})