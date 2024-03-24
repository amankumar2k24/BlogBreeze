import React from 'react'
import styles from "./pagination.module.css"
import { fetchPostsAsync, getPage, getPageSize, getTotalPost } from '@/store/slice/postSlice'
import { useDispatch, useSelector } from 'react-redux'

const Pagination = () => {
    const dispatch = useDispatch()
    let page = useSelector(getPage);
    let pageSize = useSelector(getPageSize);
    let totalPost = useSelector(getTotalPost);
    // console.log(page, pageSize, totalPost)

    const handlePrev = () => {
        // console.log("clicked previous")
        if (page > 1) {
            dispatch(fetchPostsAsync({ pagination: { page: page - 1, pageSize } }));
        }
    }

    const handleNext = (e) => {
        // console.log("clicked in next button")
        e.preventDefault()
        const totalPages = Math.ceil(totalPost / pageSize);
        if (page < totalPages) {
            dispatch(fetchPostsAsync({ pagination: { page: page + 1, pageSize } }));
        }
    }




    return (
        <div className={styles.container}>
            <button className={styles.button}
                onClick={handlePrev}
            >
                Previous
            </button>
            <button className={styles.button}
                onClick={handleNext}
            // disabled={page === Math.ceil(totalPost / pageSize)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination