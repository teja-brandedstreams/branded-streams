"use server";
import { signIn } from "../auth";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    console.log("Add user");
    const { firstname, lastname, email, password, type } = Object.fromEntries(formData);
    console.log("Signup user");
    const response = await fetch(process.env.URL + '/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            userType: type,
        }),
    });

    const result = await response.json();
    console.log(result);
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