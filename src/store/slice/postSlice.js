const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        popularPosts: [],
        singlePost: {},
        totalPosts: 0,
        status: '',
        pageSize: 8,
        page: 1
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.status = "LOADING"
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.status = "IDLE";
                state.posts = action.payload.posts;
                state.totalPosts = action.payload.totalPosts
                // if ((state.page * state.totalPosts) < state.totalPosts) {
                //     state.page = state.page + 1
                // }
                state.page = Math.min(state.page + 1, Math.ceil(state.totalPosts / state.pageSize))
            })
            .addCase(fetchPostsAsync.rejected, (state) => {
                state.status = "ERROR"
            })

            .addCase(fetchPostAsync.pending, (state) => {
                state.status = "LOADING";
            })
            .addCase(fetchPostAsync.fulfilled, (state, action) => {
                state.status = "IDLE";
                state.singlePost = action.payload;
            })
            .addCase(fetchPostAsync.rejected, (state) => {
                state.status = "ERROR"
            })

            .addCase(fetchPopularPostAsync.pending, (state) => {
                state.status = "LOADING"
            })
            .addCase(fetchPopularPostAsync.fulfilled, (state, action) => {
                state.status = "IDLE";
                state.popularPosts = action.payload;
            })
            .addCase(fetchPopularPostAsync.rejected, (state) => {
                state.status = "ERROR"
            })

            .addCase(postCommentAsync.pending, (state) => {
                state.status = "LOADING"
            })
            .addCase(postCommentAsync.fulfilled, (state, action) => {
                // console.log("action payload postCommentAsync", action.payload);
                state.status = "IDLE";
                state.singlePost = action.payload.result
            })
            .addCase(postCommentAsync.rejected, (state) => {
                state.status = "ERROR"
            })
    }
})



// Thunk Middleware =>

// For fetching the post on the basis for pagination , search and category 
export const fetchPostsAsync = createAsyncThunk("post/fetchPosts", async ({ pagination, category, search }, { rejectWithValue }) => {
    let queryString = ""

    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }
    if (category) {
        queryString += `category=${category}&`
    }
    if (search) {
        queryString += `search=${search}&`
    }

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?${queryString}`);
        // console.log("res fetchPosts Async=>", res)
        return res.data.result;
    } catch (err) {
        console.log("error from fetchPosts", err)
        return rejectWithValue(err.response.data);
    }
})

// For fetching the post by using id 
export const fetchPostAsync = createAsyncThunk("post/fetchPost", async (id) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, { cache: "no-store" })
        // console.log("response coming from fetchPostAsync", response)
        return response.data.result
    } catch (err) {
        console.log("err coming from fetchPost=>", err)
    }
})

// For fetching the popular post 
export const fetchPopularPostAsync = createAsyncThunk("post/fetchPopularPost", async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/popular-post`);
        // console.log("response coming from fetchPopularPostAsync=> ", response)
        return response?.data?.result
    } catch (err) {
        console.log("err coming from fetchPopularPost =>", err)
    }
})

//For fetching the post by comment 
export const postCommentAsync = createAsyncThunk("post/postCommentAsync", async ({ updatedObject, toast }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, updatedObject, {
            headers: { 'content-type': 'application/json' },
        });
        // console.log("response postCommentAsync=> ", response)

        if (response.data.result.comment) {
            toast.success(`Comment added`)
        }
        return response.data;
    } catch (err) {
        console.log("err coming from post by comment", err.response.data)
        return rejectWithValue(err.response.data)
    }
})



export const getPost = (state) => state.post.posts
export const getPopularPost = (state) => state.post.popularPosts
export const getSinglePost = (state) => state.post.singlePost
export const getTotalPost = (state) => state.post.totalPosts
export const getStatus = (state) => state.post.status
export const getPageSize = (state) => state.post.pageSize
export const getPage = (state) => state.post.page


export default postSlice.reducer

