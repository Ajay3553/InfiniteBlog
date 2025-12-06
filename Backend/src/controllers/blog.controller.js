import { asyncHandler } from "../utils/asyncHandler.js";
import {Blog}  from '../models/blog.model.js';
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const allBlogs = asyncHandler(async (req, res) => {
    const blogs = (await Blog.find({})).sort({createdAt : -1});
    return res.status(200).json(
        new apiResponse(
            200,
            blogs,
            "All Blogs Fetched"
        )
    )
});

const createBlog = asyncHandler(async (req, res) => {
    const {title, category, description, blogImage} = req.body;
    if(!title || !category || !description || !blogImage) throw new apiError(400, "all Fields are Required");
    const createdBlog = await Blog.create({
        title,
        blogImage,
        category,
        description,
        author: {
            _id: req.user._id,
            username: req.user.username,
            avatar: req.user.avatar
        }
    })
    if(!createdBlog) throw new apiError(400, "Something went Wrong while creating the Blog");

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            createdBlog,
            "Blog created Successfully"
        )
    )
});

const deleteBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if(!blog) throw new apiError(404, "Blog not found");
    if(blog.author._id.toString() !== req.user._id.toString()) throw new apiError(403, "Unauthorized request");
    await blog.deleteOne();
    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Blog deleted Successfully"
        )
    );
});

const getBlog = asyncHandler( async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if(!blog) throw new apiError(404, "Blog not found");

    return res.status(200).json(
        new apiResponse(
            200,
            blog,
            "Blog fetched successfully"
        )
    );
});

export {
    allBlogs,
    createBlog,
    deleteBlog,
    getBlog
}