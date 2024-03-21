"use client"

import React, { useState } from 'react'
import styles from "./categoryList.module.css"
import { category } from '@/utils/category'
import { MdSearch } from "react-icons/md";
import Image from 'next/image';
//react-redux
import { fetchPostsAsync, getPage, getPageSize } from '@/store/slice/postSlice'
import { useDispatch, useSelector } from 'react-redux'


const CategoryList = () => {
    let page = useSelector(getPage)
    let pageSize = useSelector(getPageSize)
    let dispatch = useDispatch()
    const [search, setSearch] = useState("")

    const filterCategory = (category) => {
        let pagination = { page: page, pageSize: pageSize, }
        dispatch(fetchPostsAsync({ pagination, category }))
    }

    const searchPosts = () => {
        let pagination = { page: 1, pageSize: pageSize, }
        dispatch(fetchPostsAsync({ pagination, search }))
    }

    const allPost = () => {
        setSearch("")
        let pagination = { page: page, pageSize: pageSize }
        dispatch(fetchPostsAsync({ pagination }))
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Popular Categories</h1>
            <div className={styles.categories}>
                {category.map((item, index) => {
                    return (
                        <div key={index} className={styles.category} style={{ backgroundColor: item.bg }}
                            onClick={() => filterCategory(item.name)}
                        >
                            <Image className={styles.img} width={15} height={15} src={item.img} alt="img" />
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className={styles.search}>
                <button className={styles.btn}
                    onClick={allPost}
                >
                    All
                </button>
                <input value={search} placeholder='search' className={styles.search_input} type='text'
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <MdSearch onClick={searchPosts} className={styles.searchIcon} size={25} />
            </div>
        </div>
    )
}

export default CategoryList


