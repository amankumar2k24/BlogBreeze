import React from 'react'
import styles from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ post }) => {
    return (
        <div className={styles.container}>
            {/* {console.log(" Card post=>", post)} */}
            <div className={styles.imageContainer}>
                <Image alt='imgg' className={styles.image}
                    fill
                    style={{ objectFit: "contain" }}
                    src={post?.image}
                />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>
                        {new Date(post?.createdAt).toDateString()} -
                    </span>
                    <span className={styles.category}>
                        {""} {post?.category}
                    </span>
                </div>

                <h2 className={styles.heading}>{post?.title}</h2>

                <div className={styles.desc}
                    dangerouslySetInnerHTML={{ __html: post?.story }}
                />

                <Link href={`posts/${post._id}`} className={styles.link}>Read More</Link>
            </div>
        </div>
    )

}

export default Card