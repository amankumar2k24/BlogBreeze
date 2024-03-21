import React from 'react'
import styles from "./pagination.module.css"
import { fetchPostsAsync, getPage, getPageSize, getTotalPost } from '@/store/slice/postSlice'
import { useDispatch, useSelector } from 'react-redux'

const Pagination = () => {
    const dispatch = useDispatch()
    let page = useSelector(getPage);
    let pageSize = useSelector(getPageSize);
    let TotalPost = useSelector(getTotalPost);
    console.log(page, pageSize, TotalPost)

    const prev = () => {
        console.log("clicked previous")
        if (page > 1) {
            page = page - 1
        } else {
            page = page
        }
        const pagination = { page: page, pageSize: pageSize }
        console.log("pagination coming from PREV Paginaiton Component", pagination)

        dispatch(fetchPostsAsync({ pagination }))
    }

    const next = () => {
        console.log("clicked next")
        if (page < Math.ceil(TotalPost / pageSize)) {
            page = page + 1
        } else {
            page = page
        }
        const pagination = { page: page, pageSize: pageSize }
        console.log("pagination coming from NEXT Paginaiton Component", pagination)

        dispatch(fetchPostsAsync({ pagination }))
    }




    return (
        <div className={styles.container}>
            <button className={styles.button}
                onClick={prev}
            >
                Previous
            </button>
            <button className={styles.button}
                onClick={next}
                disabled={page === Math.ceil(TotalPost / pageSize)}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination