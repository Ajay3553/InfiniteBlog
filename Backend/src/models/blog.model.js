import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },

        image: {
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
            id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            name: {
                type: String,
                required: true
            },
            avatar:{
                type: String, // cloudinry URL
            }
        }
    },{timestamps : true}
)

export const Blog = mongoose.model("Blog", blogSchema);