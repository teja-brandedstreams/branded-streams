import LoginForm from "../ui/login/loginform/loginform";
import styles from "../ui/login/login.module.css";

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div>Hello</div>
            <LoginForm />
        </div>
    )
}