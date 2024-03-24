'use client'
import React, { useContext } from 'react'
import styles from "./footer.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'

const Footer = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    {theme === "dark" ?
                        <Image alt='blogBreeze' width={190} height={60} src="/blogBreezeLight.png" />
                        :
                        <Image alt='blogBreeze' width={190} height={60} src="/blogBreezeDark.png" />
                    }
                </div>
                <p className={styles.desc}>
                    Different purposes, they both involve managing state and performing actions based on certain conditions or events. Understanding how to use hooks effectively in React able skills for building interactive and data-driven applications.
                </p>
                <div className={styles.icons}>
                    <Image src="/facebook.png" alt='facebook' width={18} height={18} />
                    <Image src="/instagram.png" alt='instagram' width={18} height={18} />
                    <Image src="/github.png" alt='github' width={18} height={18} />
                    <Image src="/linkedin.png" alt='linkedin' width={18} height={18} />
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Homepage</Link>
                    <Link href="/">Blog</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link href="/">Style</Link>
                    <Link href="/">Fashion</Link>
                    <Link href="/">Coding</Link>
                    <Link href="/">Travel</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <Link href="/">Facebook</Link>
                    <Link href="/">Instagram</Link>
                    <Link href="/">Github</Link>
                    <Link href="/">Linkedin</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer