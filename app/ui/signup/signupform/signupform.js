import Image from "next/image";
import styles from "./signupform.module.css";
import Link from "next/link";
import { addUser } from "@/app/lib/actions";
export default function SignupForm() {
    return (
        <div className={styles.container}>
            <form className={styles.form} autoComplete="off" action={addUser}>
                <Image alt="branded-streams-logo" src={"/BrandedStreams_OrangeLogo.png"} className={styles.brandLogo} width={100} height={75} />
                <h1>Signup</h1>
                <div className={`${styles.formItem} ${styles.nameSection}`}>
                    <div>
                        <label htmlFor="firstname">First Name <span>*</span></label>
                        <input type="text" placeholder="First Name" name="firstname" autoComplete="off" id="firstname" required />
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name <span>*</span></label>
                        <input type="text" placeholder="Last Name" name="lastname" autoComplete="off" id="lastname" required />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="text" placeholder="Email" name="email" autoComplete="off" id="email" required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">Password <span>*</span></label>
                    <input type="password" placeholder="Password" name="password" autoComplete="off" id="password" required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" autoComplete="off" id="password" required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="userType">Who are you? <span>*</span></label>
                    <select id="userType" name="type" required>
                        <option value={""}>Select an option</option>
                        <option value={"production"}>Production House</option>
                        <option value={"brand"}>Brand</option>
                    </select>
                </div>
                <div className={styles.actionButton}>
                    <span>Already have an account? <Link href="/login">Login</Link></span>
                    <button>Signup</button>
                </div>

            </form>
        </div>
    )
}