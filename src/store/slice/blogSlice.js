import { BASE_API_URL } from "@/utils/constants";
import axios from "axios";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        status: "LOADING",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PostBlogData.pending, (state, action) => {
                state.status = "LOADING"
            })
            .addCase(PostBlogData.fulfilled, (state, action) => {
                state.status = "IDLE"
            })
            .addCase(PostBlogData.rejected, (state, action) => {
                state.status = "ERROR"
            })
    }
})


//Thunk middleware 
export const PostBlogData = createAsyncThunk("blog/PostBlogData", async ({ formData, toast, router, setLoading }) => {

    try {
        let config = {
            headers: { "content-type": "multipart/form-data" }
        }
        const response = await axios.post(`${BASE_API_URL}/api/posts`, formData, config)
        // console.log("response coming from PostBlogData === >>", response.data.result)
        if (response.status === 200) {
            setLoading(false)
            toast.success(response.data.message)
            setTimeout(() => {
                router.push(`/posts/${response.data.result._id}`)
            });
        }

    } catch (error) {
        // console.log("err coming from blogSlice", error)
        toast.error("blog failed to publish");
        return rejectWithValue(error);
    }

})



export const getStatus = (state) => state.blog.status;
export default blogSlice.reducer;


