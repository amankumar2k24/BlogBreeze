
import { connectDB } from "@/utils/db"
import { NextResponse } from "next/server";
import { UploadImage } from "@/app/cloudinary/upload-image";
import { BlogModel } from "@/model/blog";

//POST
export async function POST(req, res) {
    const formData = await req.formData();

    const username = formData.get("username");
    const email = formData.get("email");
    const userProfile = formData.get("userProfile")
    const title = formData.get("title");
    const category = formData.get("category");
    const story = formData.get("story");
    const image = formData.get("image");

    if (!image) {
        return NextResponse.json({ error: "No files received" }, { status: 400 })
    }

    try {
        await connectDB();
        const cloudinaryRes = await UploadImage(image, "nextjs-imagegallery")

        const newPost = await new BlogModel({
            username,
            email,
            userProfile,
            title,
            category,
            story,
            // comment: comment || "",
            image: cloudinaryRes.secure_url
        })

        let data = await newPost.save()
        // console.log("data=>", data)

        return NextResponse.json({ message: "Blog created successfully", result: data }, { status: 200 })
    } catch (err) {
        // console.log("err=>", err)
        return NextResponse.json({ Message: "Blog failed to create" }, { status: 500 })
    }
}

//GET 
export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const pageSize = parseInt(searchParams.get("pagesize")) || 10;
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        await connectDB();

        // Build query conditions
        const queryConditions = {};
        if (category) {
            queryConditions.category = category;
        }
        if (search) {
            const searchTerms = search.split(" ");
            queryConditions.$or = searchTerms.map(term => ({
                title: { $regex: new RegExp(term, "i") },
            }));
        }

        // Count total posts
        const totalPosts = await BlogModel.countDocuments(queryConditions);

        // Fetch posts with pagination
        const posts = await BlogModel.find(queryConditions)
            .sort({ _id: -1 }) // Sort by _id in descending order
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return NextResponse.json({ message: "Posts retrieved successfully", result: { posts, totalPosts } }, { status: 200 });
    } catch (err) {
        // console.log(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
