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
                    Blog Breeze: Explore, Learn, and Inspire.
                    Blog is a refreshing breeze in the world of online content, inviting readers to explore, learn, and be inspired by the articles and posts you share. Feel free to adjust it to better fit the tone and focus of your blog.
                </p>
                <div className={styles.icons}>
                    <a href='https://www.facebook.com/aman.cool2k18/' target='_blank'>
                        <Image src="/facebook.png" alt='facebook' width={24} height={24} />
                    </a>
                    <a href='https://www.instagram.com/aman.kumar2k15/' target='_blank' >
                        <Image src="/instagram.png" alt='instagram' width={24} height={24} />
                    </a>
                    <a href='https://github.com/amankumar2k15' target='_blank'>
                        <Image src="/github.png" alt='github' width={24} height={24} />
                    </a>
                    <a href='https://www.linkedin.com/in/amankumar1in/' target='_blank'>
                        <Image src="/linkedin.png" alt='linkedin' width={24} height={24} />
                    </a>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Home</Link>
                    <Link href="/">Blog</Link>
                    <Link href="/">About</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link href="/blog?cat=style">Style</Link>
                    <Link href="/blog?cat=fashion">Fashion</Link>
                    <Link href="/blog?cat=coding">Coding</Link>
                    <Link href="/blog?cat=travel">Travel</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <a href='https://www.facebook.com/aman.cool2k18/' target='_blank'>
                        <Link href="/">Facebook</Link>
                    </a>
                    <a href='https://www.instagram.com/aman.kumar2k15/' target='_blank'>
                        <Link href="/">Instagram</Link>
                    </a>
                    <a href='https://github.com/amankumar2k15' target='_blank'>
                        <Link href="/">Github</Link>
                    </a>
                    <a href='https://www.linkedin.com/in/amankumar1in/' target='_blank'>
                        <Link href="/">Linkedin</Link>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer