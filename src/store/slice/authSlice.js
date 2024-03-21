"use client"
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    isLogin: "",
    user: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export default authSlice.reducer