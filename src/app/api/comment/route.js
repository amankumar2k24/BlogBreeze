import { BlogModel } from "@/model/blog";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(req, res) {
    const payload = await req.json()
    // console.log("payload from COMMENT API", payload)

    try {
        await connectDB()
        const comment = await BlogModel.findByIdAndUpdate(payload._id, payload, { new: true })
        return NextResponse.json({ message: "Comment updated successfully", result: comment }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}