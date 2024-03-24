import React from 'react'
import styles from "./navbar.module.css"
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '../themeToggle/ThemeToggle'
import AuthLinks from '../authLinks/AuthLinks'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src="/facebook.png" alt='facebook' width={24} height={24} />
                <Image src="/instagram.png" alt='instagram' width={24} height={24} />
                <Image src="/github.png" alt='github' width={24} height={24} />
                <Image src="/linkedin.png" alt='linkedin' width={24} height={24} />
            </div>

            <div className={styles.logoContainer}>
                <Link className={styles.logo} href="/">
                    <Image alt='blogBreeze' width={190} height={60} src="/blogBreeze.png" />
                </Link>
            </div>

            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/" className={styles.link}>Contact</Link>
                <Link href="/" className={styles.link}>About</Link>
                <AuthLinks />
            </div>
        </div>
    )
}

export default Navbar