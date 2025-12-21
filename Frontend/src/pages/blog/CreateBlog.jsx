import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiUpload, FiX } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const CREATE_BLOG_ENDPOINT = `${API_BASE_URL}/api/blogs/create`
const CURRENT_USER_ENDPOINT = `${API_BASE_URL}/api/users/current-user`

function CreateBlog() {
    const [user, setUser] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm()

    const blogImage = watch('blogImage')

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (blogImage && blogImage[0]) {
        const file = blogImage[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
        } else {
        setImagePreview(null)
        }
    }, [blogImage])

    const checkAuth = async () => {
        try {
        const res = await fetch(CURRENT_USER_ENDPOINT, {
            method: 'GET',
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            if (data.success && data.data) {
            setUser(data.data)
            } else {
            toast.error('Please login first')
            navigate('/login')
            }
        } else {
            toast.error('Please login first')
            navigate('/login')
        }
        } catch (e) {
        console.error('Auth check failed:', e)
        navigate('/login')
        }
    }

    const onSubmit = async (data) => {
        try {
        setIsSubmitting(true)

        // Create FormData
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('category', data.category)
        formData.append('description', data.description)

        if (data.blogImage && data.blogImage[0]) {
            formData.append('blogImage', data.blogImage[0])
        }

        const res = await fetch(CREATE_BLOG_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const result = await res.json()

        if (res.ok && result.success) {
            toast.success('Blog created successfully!')
            navigate('/dashboard')
        } else {
            toast.error(result.message || 'Failed to create blog')
        }
        } catch (e) {
        console.error('Create blog failed:', e)
        toast.error('Failed to create blog')
        } finally {
        setIsSubmitting(false)
        }
    }

    const removeImage = () => {
        setValue('blogImage', null)
        setImagePreview(null)
    }

    if (!user) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog</h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Title */}
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                type="text"
                id="title"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                placeholder="Enter your blog title"
                />
                {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            {/* Category */}
            <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
                </label>
                <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Science">Science</option>
                <option value="Space">Space</option>
                <option value="Other">Other</option>
                </select>
                {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
            </div>

            {/* Description */}
            <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
                </label>
                <textarea
                id="description"
                {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 50, message: 'Description must be at least 50 characters' }
                })}
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Write your blog content here..."
                />
                {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                {watch('description')?.length || 0} characters (minimum 50)
                </p>
            </div>

            {/* Blog Image */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Image <span className="text-red-500">*</span>
                </label>

                {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition">
                    <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <label
                    htmlFor="blogImage"
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium"
                    >
                    <FiUpload />
                    Choose Image
                    </label>
                    <input
                    type="file"
                    id="blogImage"
                    {...register('blogImage', {
                        required: 'Blog image is required',
                        validate: {
                        isImage: (files) => {
                            if (!files || !files[0]) return true
                            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
                            return validTypes.includes(files[0].type) || 'Only JPG, PNG, and WEBP images are allowed'
                        },
                        fileSize: (files) => {
                            if (!files || !files[0]) return true
                            return files[0].size <= 5 * 1024 * 1024 || 'Image must be less than 5MB'
                        }
                        }
                    })}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    />
                    <p className="mt-2 text-sm text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                </div>
                ) : (
                <div className="relative">
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                    <FiX className="text-xl" />
                    </button>
                </div>
                )}
                {errors.blogImage && (
                <p className="mt-1 text-sm text-red-600">{errors.blogImage.message}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isSubmitting ? 'Creating...' : 'Create Blog'}
                </button>
                <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    )
}

export default CreateBlog
