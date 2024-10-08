"use client"

import React, { useState } from 'react'
import styles from "./authLinks.module.css"
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
    // temporary 
    const [open, setOpen] = useState(false)
    const { status } = useSession();
    // console.log("status", status)

    return (
        <>
            {status === "unauthenticated" ?
                (
                    <Link href="/login" className={styles.link}>
                        Login
                    </Link>
                ) : (
                    <>
                        <Link href="/write" className={styles.link}>
                            Write
                        </Link>
                        <span className={styles.link}
                            onClick={signOut}
                        >
                            Logout
                        </span>
                    </>
                )
            }

            {/* //hamburger for small screen  */}
            <div className={styles.burger} onClick={() => setOpen(!open)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>


            {open &&
                <div className={styles.responsiveMenu}>
                    <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                    {status === "unauthenticated" ?
                        (
                            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                        ) : (
                            <>
                                <Link href="/write" onClick={() => setOpen(false)}>Write</Link>
                                <span onClick={signOut}>Logout</span>
                            </>
                        )
                    }
                </div>
            }
        </>
    )
}

export default AuthLinks