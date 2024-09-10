"use client"
import styles from "./navbar.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathName = usePathname().split("/").pop();
    return (
        <div className={styles.container}>
            <div className={styles.pageName}>{pathName}</div>
            <div className={styles.actionIcons}>
                <MdOutlineMessage />
                <IoIosNotifications />
                <RiAccountCircleFill />
            </div>
        </div>
    )
}