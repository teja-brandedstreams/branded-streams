"use server"
import { menuItems } from "@/app/lib/data/staticData";
import styles from "./sidebar.module.css";
import { FaRegUser } from "react-icons/fa";
import MenuLink from "./menulink/menulink";
// import { signOut } from "@/app/auth";

import { signOut } from "next-auth/react";

import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import LogoutButton from "./logoutButton";
import { redirect } from "next/navigation";

export default async function Sidebar() {
    let decoded;
    try {
        const cookieStore = cookies(); // Get the cookies object
        const token = cookieStore.get('bstreams')?.value;
        decoded = jwt && jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            redirect("/login");
        }
    } catch (err) {
        redirect("/login");
    }

    return (
        <div className={styles.container}>
            <div className={styles.userSection}>
                <FaRegUser />
                {decoded && decoded.firstName} {decoded && decoded.lastName}
            </div>
            <div className={styles.menu}>
                <ul className={styles.list}>
                    {menuItems.map((cat) => (
                        <li key={uuidv4()}>
                            <span className={styles.cat}>{cat.page}</span>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={uuidv4()} />
                            ))}
                        </li>
                    ))}
                </ul>
                {/* <form
                    action={async () => {
                        await signOut({ redirect: true, callbackUrl: '/' }); // Redirect to home after logout
                    }}
                > */}
                <LogoutButton />

                {/* </form> */}
            </div>
        </div>
    )
}