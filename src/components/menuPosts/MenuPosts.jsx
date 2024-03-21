"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from "./menuPosts.module.css"
import SkeletonLoading from '../skeleton_Loader/SkeletonLoader'
//react-redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularPostAsync, getPopularPost, getStatus } from '@/store/slice/postSlice'

const MenuPosts = ({ withImage }) => {
    const dispatch = useDispatch()
    const popularPosts = useSelector(getPopularPost);
    let status = useSelector(getStatus)

    useEffect(() => {
        dispatch(fetchPopularPostAsync())
    }, [dispatch])


    return (
        <>
            <div className={styles.items}>

                {popularPosts?.length > 0 &&
                    status === "IDLE" && (
                        popularPosts?.map((item, index) => {

                            const backgroundColors = ["#789cff", "#775aec", "#ff7887", "#7fb881", "#ffb14f"]
                            return (
                                <Link key={item._id} className={styles.item}
                                    href={`/posts/${item._id}`}
                                >
                                    {withImage && <div className={styles.imageContainer}>
                                        <Image src={item?.userProfile} width={50} height={50} alt='img' className={styles.image} />
                                    </div>}

                                    <div className={styles.textContainer}>
                                        <span className={`${styles.category} `}
                                            style={{ backgroundColor: backgroundColors[index] }}
                                        >
                                            {item?.category}
                                        </span>
                                        <h3 className={styles.postTitle}>
                                            {item?.title}
                                        </h3>
                                        <div className={styles.detail}>
                                            <span className={styles.username}>
                                                {item?.username}
                                            </span>
                                            <span className={styles.date}>
                                                {" "}
                                                - {new Date(item.createdAt).toDateString()}
                                                {" "}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }

                {status === "LOADING" && (
                    <>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                    </>
                )}

                {(popularPosts.length < 1 && status === "IDLE" && <p> No Posts Found</p>)}

            </div>
        </>
    )
}

export default MenuPosts