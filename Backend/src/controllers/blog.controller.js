import { asyncHandler } from "../utils/asyncHandler.js";
import {Blog}  from '../models/blog.model.js';
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const allBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    return res.status(200).json(
        new apiResponse(
            200,
            blogs,
            "All Blogs Fetched"
        )
    )
});

const createBlog = asyncHandler(async (req, res) => {
    const { title, category, description } = req.body;
    if(!title || !category || !description){
        throw new apiError(400, "All fields are required");
    }

    const blogImageLocalPath = req.files?.blogImage?.[0]?.path;
    if(!blogImageLocalPath){
        throw new apiError(400, "Blog image is required");
    }
    const uploadedImage = await uploadOnCloudinary(blogImageLocalPath);
    if(!uploadedImage){
        throw new apiError(500, "Failed to upload blog image");
    }

    const blog = await Blog.create({
        title,
        category,
        description,
        blogImage: uploadedImage.url,
        author: {
        _id: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar,
        },
    });

    if (!blog) {
        throw new apiError(400, "Something went wrong while creating the blog");
    }

    return res.status(200).json(
        new apiResponse(200, blog, "Blog created successfully")
    );
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

const updateBlog = asyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const {newTitle, newCategory, newDescription} = req.body;
    const blog = await Blog.findById(blogId);
    if(!blog) throw new apiError(404, "Blog not found");
    if(blog.author._id.toString() !== req.user._id.toString()) throw new apiError(403, "Unathorized request");

    if(newTitle) blog.title = newTitle;
    if(newCategory) blog.category = newCategory;
    if(newDescription) blog.description = newDescription;

    const blogImageLocalPath = req.files?.blogImage?.[0]?.path;
    if(blogImageLocalPath){
        const uploadedImage = await uploadOnCloudinary(blogImageLocalPath);
        blog.blogImage = uploadedImage.url;
    }

    await blog.save({validateBeforeSave: false})

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Blog Updated Successfully"
        )
    )
});

const userBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find({"author._id": req.user._id}).sort({createdAt : -1});
    if(!blogs || blogs.length === 0) throw new apiError(400, "No Blogs Found For this User");
    res.status(200).json(
        new apiResponse(
            200,
            blogs,
            "User Blogs Fetched Successfully"
        )
    )
});

export {
    allBlogs,
    createBlog,
    deleteBlog,
    getBlog,
    updateBlog,
    userBlogs
}