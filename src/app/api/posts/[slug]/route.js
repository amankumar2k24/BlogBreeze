import { BlogModel } from "@/model/blog"
import { connectDB } from "@/utils/db"
import { NextResponse } from "next/server"

// GET Single Post By Id 
export async function GET(req, content) {
    const slug = content.params.slug

    try {
        await connectDB()
        let blogPost = await BlogModel.findById(slug)
        return NextResponse.json({ message: "Post successfully fetched by ID", result: blogPost }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}