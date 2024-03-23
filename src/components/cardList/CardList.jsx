"use client"
import React, { useEffect } from 'react'
import styles from "./cardList.module.css"
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsAsync, getPage, getPageSize, getPost } from '@/store/slice/postSlice'
import { getStatus } from '@/store/slice/postSlice'
import SkeletonLoading from '../skeleton_Loader/SkeletonLoader'

const CardList = ({ category }) => {
    console.log("CardList category=>", category)
    const page = useSelector(getPage)
    const pageSize = useSelector(getPageSize)
    const status = useSelector(getStatus)
    const posts = useSelector(getPost)
    // console.log("postss=>", posts)
    // console.log("status=>", status)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsAsync({ category }))
    }, [dispatch, category])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            {/* <div className={styles.posts}>
            </div> */}
            {(posts?.length > 0 && status === "IDLE") &&
                posts?.map((post) => {
                    return <Card key={post?._id} post={post} />
                })
            }

            {posts?.length > 7 && status === "IDLE" && <Pagination />}
            {(posts?.length < 1 && status === "IDLE" &&
                <p>No Posts found</p>
            )}
            {status === "LOADING" && (
                <>
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                </>
            )}


        </div>
    )
}

export default CardList