import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/header.module.css"

export default function Header() {
    return <div className={styles.header_container}>
            <Image src="/cyber-mix-logo.png" alt="Cyber Mix logo" width={150} height={150}/>
            <div className={styles.header_links}>
                <Link href="/">Home</Link>
                <Link href="/my-mixes">My mixes</Link>
                <Link href="/new-mix">New mix</Link>
                <Link href="/about">About</Link>
            </div>
    </div>
}