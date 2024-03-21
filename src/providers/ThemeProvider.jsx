"use client"

import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false)
    const { theme } = useContext(ThemeContext)
    // console.log("theme", theme)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (mounted) {
        return <div className={theme}>
            {children}
        </div>
    }
}

export default ThemeProvider
