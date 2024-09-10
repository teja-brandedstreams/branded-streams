import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfg";
import { User } from "./lib/models";
import bcrypt from "bcrypt";
import connectToDB from "./lib/utils";

const login = async (credentials) => {
    // try {
    //     connectToDB();
    //     console.log("credentials...", JSON.stringify(credentials));
    //     const user = await User.findOne({ email: credentials.username });
    //     console.log("User..", user);
    //     if (!user) throw new Error("Wrong credentials!");

    //     const isPasswordCorrect = await bcrypt.compare(
    //         credentials.password,
    //         user.password
    //     );

    //     if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    //     return true;
    // } catch (err) {
    //     console.log(err);
    //     throw new Error("Failed to login!");
    // }
    return true
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ]
})