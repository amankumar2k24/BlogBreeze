"use client"
import React, { useContext } from 'react'
import styles from "./navbar.module.css"
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '../themeToggle/ThemeToggle'
import AuthLinks from '../authLinks/AuthLinks'
import { ThemeContext } from '@/context/ThemeContext'

const Navbar = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Link className={styles.logo} href="/">
                    {theme === "dark" ?
                        <>
                            <Image alt='blogBreeze' width={190} height={60} src="/blogBreezeLight.png" className={styles.logo1} />
                            <Image alt='blogBreeze' width={60} height={50} title='Blog Breeze' src="/blogIcon.png" className={styles.logo2} />
                        </>
                        :
                        <>
                            <Image alt='blogBreeze' width={190} height={60} src="/blogBreezeDark.png" className={styles.logo1} />
                            <Image alt='blogBreeze' width={60} height={50} title='Blog Breeze' src="/blogIcon.png" className={styles.logo2} />
                        </>
                    }
                </Link>
            </div>

            <div className={styles.social}>
                <Image src="/facebook.png" alt='facebook' width={24} height={24} />
                <Image src="/instagram.png" alt='instagram' width={24} height={24} />
                <Image src="/github.png" alt='github' width={24} height={24} />
                <Image src="/linkedin.png" alt='linkedin' width={24} height={24} />
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