"use client"
import { menuItems } from "@/app/lib/data/staticData";
import styles from "./sidebar.module.css";
import { FaRegUser } from "react-icons/fa";
import MenuLink from "./menulink/menulink";
// import { signOut } from "@/app/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/login' }); // Redirect after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.userSection}>
                <FaRegUser />
                John Cena
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
                <button className={styles.logout} onClick={handleLogout}>
                    <RiLogoutBoxRLine />
                    Logout
                </button>
                {/* </form> */}
            </div>
        </div>
    )
}