import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },

        blogImage: {
            type: String, //cloudinary URL
            required: true
        },

        category: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        author: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            username: {
                type: String,
                required: true
            },
            avatar:{
                type: String, // cloudinry URL
                required: true
            }
        }
    },{timestamps : true}
)

export const Blog = mongoose.model("Blog", blogSchema);