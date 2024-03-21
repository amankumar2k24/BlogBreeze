import { BlogModel } from "@/model/blog";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        const data = await BlogModel.find({})
        const popularBlog = data.filter((item) => item.comment.length > 0)

        const sortedArray = popularBlog.sort((a, b) => (
            b.comment.length - a.comment.length
        ))

        return NextResponse.json({ message: "Popular Blog fetched successfully", result: sortedArray }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}