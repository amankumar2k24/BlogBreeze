"use client"
import { useEffect } from "react";
import Image from "next/image"
import styles from "./singlePage.module.css"
import Comments from "@/components/comments/Comments"
import Menu from "@/components/menu/Menu"
import SkeletonLoading from "@/components/skeleton_Loader/SkeletonLoader";
//react-redux
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAsync, getSinglePost } from "@/store/slice/postSlice";
import { getStatus } from "@/store/slice/postSlice";


const SinglePage = ({ params }) => {
    const { slug } = params;
    // react-redux 
    const dispatch = useDispatch()
    const status = useSelector(getStatus);
    const blogPost = useSelector(getSinglePost);
    // console.log("status comming from SinglePage", status)
    // console.log("blogPost comming from SinglePage", blogPost)

    useEffect(() => {
        dispatch(fetchPostAsync(slug))
    }, [dispatch, slug])


    return (
        <div className={styles.container}>

            {status === "LOADING" ? (
                <>
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                </>
            ) : (
                <div className={styles.infoContainer}>
                    <div className={styles.textContainer}>
                        <h2 className={styles.heading}>{blogPost?.title}</h2>
                        <div className={styles.user}>
                            <div className={styles.userImageContainer}>
                                {blogPost?.userProfile && (
                                    <Image alt="img.." className={styles.avatar}
                                        srcSet={blogPost?.userProfile}
                                        src={blogPost?.userProfile}
                                        width={50}
                                        height={50}
                                    />
                                )}
                            </div>
                            <div className={styles.userTextContainer}>
                                <span className={styles.username}>{blogPost?.username}</span>
                                <span className={styles.date}>{new Date(blogPost?.createdAt).toDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        {blogPost?.image && (
                            <Image alt="img.." fill className={styles.image}
                                src={blogPost?.image}
                            />
                        )}
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.post}>
                    <div className={styles.description}>
                        {status === "LOADING" ? (
                            <>
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                            </>
                        ) : (

                            <div className={styles.blogText}
                                dangerouslySetInnerHTML={{ __html: blogPost?.story, }}
                            />
                        )}
                    </div>
                    <div className={styles.comments}>
                        <Comments post={blogPost} />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default SinglePage