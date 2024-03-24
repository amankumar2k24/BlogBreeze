import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    userProfile: { type: String, },
    title: { type: String, require: true },
    category: { type: String, require: true },
    story: { type: String, require: true },
    comment: { type: [Schema.Types.Mixed] },
    image: { type: String }
},
    { timestamps: true }
)

// export const Blog = mongoose.model("Blog", blogSchema)
// export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export const BlogModel =
    (mongoose.models && mongoose.models.BlogModel)
        ? mongoose.models.BlogModel : mongoose.model("BlogModel", blogSchema);
