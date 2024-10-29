"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./loginform.module.css";
import Link from "next/link";
import { authenticate } from "@/app/lib/actions";


export default function LoginForm() {

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(e.target); // Get form data
        const result = await authenticate(formData); // Call authenticate function
        console.log(result);
        if (result && result.success) {
            router.push('/dashboard/scripts'); // Redirect on success
        } else {
            console.log(result); // Show error message
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Image alt="branded-streams-logo" className={styles.brandLogo} src={"/BrandedStreams_OrangeLogo.png"} width={250} height={75} />
                <h1>Login</h1>
                <div className={styles.formItem}>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="text" placeholder="Email" name="email" autoComplete="off" id="email" required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="password">Password <span>*</span></label>
                    <input type="password" placeholder="Password" name="password" autoComplete="off" id="password" required />
                </div>
                <div className={styles.actionButtons}>
                    <span>New User?1 <Link href="/signup">Signup</Link></span>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}