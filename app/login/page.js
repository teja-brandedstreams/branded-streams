"use server"
import LoginForm from "../ui/login/loginform/loginform";
import styles from "../ui/login/login.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import SpinnerOverlay from "../ui/overlay/overlay";

export default async function LoginPage() {

    const cookieStore = cookies(); // Get the cookies object
    const token = cookieStore.get('bstreams')?.value;
    if (token && jwt.verify(token, process.env.JWT_SECRET)) {
        redirect('/dashboard/scripts');
    }

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    )
}