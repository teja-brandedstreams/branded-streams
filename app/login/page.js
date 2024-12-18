"use server";
import LoginForm from "../ui/login/loginform/loginform";
import styles from "../ui/login/login.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function LoginPage() {
    const cookieStore = cookies(); // Get the cookies object
    const token = cookieStore.get("bstreams")?.value;

    if (token && jwt) {
        try {
            // Verify the token
            jwt.verify(token, process.env.JWT_SECRET);
            // If the token is valid, redirect to the dashboard
            redirect("/dashboard/scripts");
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                console.error("Token expired. Stay on the login page.");
                // No redirect, stay on the login page
            } else {
                console.error("Invalid token:", err.message);
                // No redirect, stay on the login page
            }
        }
    }

    // Render the login form if no valid token is found or token is invalid/expired
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
}
