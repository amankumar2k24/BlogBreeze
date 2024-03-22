import React from 'react'
import styles from "./menu.module.css"
import MenuPosts from '../menuPosts/MenuPosts'
import MenuCategories from '../menuCategories/MenuCategories'

const Menu = () => {
    return (
        <div className={styles.container}>
           <div className={styles.boxContainer}>
             {/* ==>first para<== */}
             <h2 className={styles.subtitle}>Whats Hot</h2>
            <h1 className={styles.title}>Most popular</h1>
            <MenuPosts withImage={false} />

            {/* ==>second para<== */}
            <h2 className={styles.subtitle}>Discover by topic</h2>
            <h1 className={styles.title}>Categories</h1>
            <MenuCategories />

            {/* ==>third para<== */}
            <h2 className={styles.subtitle}>Latest Blogs</h2>
            <h1 className={styles.title}>Creator of Blog</h1>
            <MenuPosts withImage={true} />
           </div>
        </div>
    )
}

export default Menu