"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

export default function MenuLink({ item }) {

    const pathname = usePathname()
    return (
        <Link href={item.link} className={`${styles.container} ${pathname === item.link ? styles.active : ''}`}>
            {item.icon}
            {item.title}
        </Link>
    )
}
