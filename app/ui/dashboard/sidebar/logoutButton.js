"use client";

import { useRouter } from "next/navigation"; // Correct import for App Router
import styles from "./sidebar.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function LogoutButton() {
    const router = useRouter(); // Correct usage of `useRouter`

    function handleLogout() {
        document.cookie = "bstreams=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/login');
    }

    return (
        <button className={styles.logout} onClick={() => handleLogout()}>
            <RiLogoutBoxRLine />
            Logout
        </button>
    );
}
