"use server"
import { signIn } from "../auth";
import { User } from "./models";
import connectToDB from "./utils";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    const { firstname, lastname, email, password, type } = Object.fromEntries(formData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            type
        });
        await newUser.save();

    } catch (Err) {
        console.log(Err);
    }
}

export const authenticate = async (formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        console.log("Username..", username, "Password...", password);
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};