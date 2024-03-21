"use client"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import postReducer from "./slice/postSlice";
import blogReducer from "./slice/blogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        blog: blogReducer
    }
})
