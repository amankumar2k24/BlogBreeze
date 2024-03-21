"use client"

import Image from 'next/image'
import styles from "./writePage.module.css"
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import QuillEditor from './QuillEditor';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PostBlogData, getStatus } from '@/store/slice/blogSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

export default function Page() {
    let [loading, setLoading] = useState(false);
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("");

    const { data, status } = useSession()
    const router = useRouter()
    //react-redux 
    const dispatch = useDispatch();
    const BlogStatus = useSelector(getStatus)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleUpload = async (e) => {
        setLoading(true)
        // console.log("I am clicked")
        e.preventDefault();
        if (title && selectedFile && category && content) {
            const formData = new FormData();
            formData.append("username", data.user.name);
            formData.append("email", data.user.email);
            formData.append("userProfile", data.user.image);
            formData.append("title", title)
            formData.append("category", category);
            formData.append("story", content)
            formData.append("image", selectedFile);

            try {
                dispatch(PostBlogData({ formData, toast, router, setLoading }));
                // if (response.status === 200) {
                //     setLoading(false)
                setTitle("")
                setContent("");
                setCategory("");
                setSelectedFile("");
                // }    
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        } else {
            setLoading(false)
            toast.warning("Please fill the required fields")
        }
    }

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Title" className={styles.input} value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select className={styles.select} value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option>choose</option>
                <option value="style">style</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="culture">culture</option>
                <option value="travel">travel</option>
                <option value="coding">coding</option>
            </select>

            {selectedFile && (<p style={{ marginLeft: "5px", marginBottom: "6px" }}>{selectedFile.name}</p>)}

            <div>
                <label className={styles.button} htmlFor="image">
                    <Image src="/plus.png" alt="img" width={16} height={16} />
                </label>

                <input type="file" id="image" name="img" accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
            <br />
            <div className={styles.editor}>
                {/* {BlogStatus === "LOADING" && (
                    <div className={styles.loading}>... Loading</div>
                )} */}
                <QuillEditor content={content} setContent={setContent} />
            </div>

            <button onClick={handleUpload} className={styles.publish}>
                {loading ? <SyncLoader size={8} color="#ffffff" /> : "Publish"}
            </button>
        </div>
    )
}