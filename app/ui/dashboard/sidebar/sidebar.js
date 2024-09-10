import { menuItems } from "@/app/lib/data/staticData";
import styles from "./sidebar.module.css";
import { FaRegUser } from "react-icons/fa";
import MenuLink from "./menulink/menulink";
import { signOut } from "@/app/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Sidebar() {

    return (
        <div className={styles.container}>
            <div className={styles.userSection}>
                <FaRegUser />
                John Cena
            </div>
            <div className={styles.menu}>
                <ul className={styles.list}>
                    {menuItems.map((cat) => (
                        <li key={cat.title}>
                            <span className={styles.cat}>{cat.page}</span>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className={styles.logout}>
                        <RiLogoutBoxRLine />
                        Logout
                    </button>
                </form>
            </div>
        </div>
    )
}