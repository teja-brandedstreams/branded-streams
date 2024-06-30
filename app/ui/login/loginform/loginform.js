import Image from "next/image";
import styles from "./loginform.module.css";
import Link from "next/link";
import { authenticate } from "@/app/lib/actions";


export default async function LoginForm() {

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Image alt="branded-streams-logo" className={styles.brandLogo} src={"/BrandedStreams_OrangeLogo.png"} width={250} height={75} />
                <h1>Login</h1>
                <div className={styles.formItem}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="text" placeholder="Email" name="username" autoComplete="off" id="email" required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">Password <span>*</span></label>
                    <input type="password" placeholder="Password" name="password" autoComplete="off" id="password" required />
                </div>
                <div className={styles.actionButtons}>
                    <span>New User? <Link href="/signup">Signup</Link></span>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}