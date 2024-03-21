import React, { useState } from 'react'
import styles from "./comments.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { postCommentAsync } from '@/store/slice/postSlice'
import { toast } from 'react-toastify';
import SkeletonLoading from '../skeleton_Loader/SkeletonLoader'

const Comments = ({ post }) => {
    // console.log("post comment ==>", post)
    const { status, data } = useSession()
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        let userComment = {};
        userComment.userName = data.user.name;
        userComment.email = data.user.email;
        userComment.img = data.user.image;
        userComment.date = new Date();
        userComment.comment = comment;

        const updatedObject = {
            ...post,
            comment: [...post?.comment, userComment]
        }

        dispatch(postCommentAsync({ updatedObject, toast }))
        setComment("")
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Comments</h2>
            <div className={styles.inputContainer}>
                <input disabled={status !== "authenticated"} placeholder="write a comment" className={styles.input} type="text"
                    onChange={(e) => { setComment(e.target.value) }}
                    value={comment}
                />

                <div className={styles.btn}>
                    <button disabled={!comment} onClick={handleSubmit}>
                        Send
                    </button>
                </div>
            </div>
            {status !== "authenticated" && (
                <p style={{ marginTop: "10px" }}>
                    {" "}
                    <Link style={{ color: "red" }} href="/login">
                        login
                    </Link>{" "}
                    to comment
                </p>
            )}

            {post ? (
                post.comment?.map((item) => {
                    return (
                        <div key={item.date} className={styles.comments}>
                            <div className={styles.userContainer}>
                                <Image alt="imgProfile" width={40} height={40}
                                    src={item?.img || "/moon.png"}
                                />
                                <div className={styles.userName}>
                                    <h4>{item?.userName}</h4>
                                    <p>{new Date(item.date).toDateString()}</p>
                                </div>
                            </div>
                            <p className={styles.content}>{item?.comment}</p>
                        </div>
                    );
                })
            ) : (
                <>
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                </>
            )}
        </div>
    )
}

export default Comments