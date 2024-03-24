"use client"

import CardList from "@/components/cardList/CardList"
import styles from "./blogPage.module.css"
import Menu from "@/components/menu/Menu"
import { useSearchParams } from "next/navigation"


const BlogPage = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get("cat")
    // console.log("category coming from BlogPage", category)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{category} Blog</h2>
            <div className={styles.content}>
                <CardList category={category} />
                <Menu />
            </div>
        </div>
    )
}

export default BlogPage