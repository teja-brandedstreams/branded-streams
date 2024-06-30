import styles from "../ui/signup/signup.module.css";
import SignupForm from "../ui/signup/signupform/signupform";

export default function Signup() {
    return (
        <div className={styles.container}>
            <SignupForm />
        </div>
    )
}