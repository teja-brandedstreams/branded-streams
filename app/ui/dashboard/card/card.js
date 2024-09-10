import Link from "next/link";
import styles from "./card.module.css";

export default function Card({ card }) {
    return (
        <div key={card.title} className={styles.contentCard}>
            <div className={styles.title}>{card.title}</div>
            <div className={styles.description}>{card.description}</div>
            <Link className={styles.link} href={card.linkURL}>{card.linkText}</Link>
        </div>
    );
}