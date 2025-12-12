import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { BiCalendar } from 'react-icons/bi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const CURRENT_USER_ENDPOINT = `${API_BASE_URL}/api/users/current-user`
const USER_BLOGS_ENDPOINT = `${API_BASE_URL}/api/blogs/user/blogs`

function Dashboard() {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
        fetchUserBlogs()
    }, [])

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

    const fetchUserBlogs = async () => {
        try {
        setLoading(true)
        const res = await fetch(USER_BLOGS_ENDPOINT, {
            method: 'GET',
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            setBlogs(data.data || [])
        }
        } catch (e) {
        console.error('Failed to fetch blogs:', e)
        toast.error('Failed to load your blogs')
        } finally {
        setLoading(false)
        }
    }

    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return

        try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/user/blog/delete/${blogId}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (res.ok) {
            toast.success('Blog deleted successfully')
            fetchUserBlogs()
        } else {
            toast.error('Failed to delete blog')
        }
        } catch (e) {
        console.error('Delete failed:', e)
        toast.error('Failed to delete blog')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
        })
    }

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                    />
                    ) : (
                    user?.username?.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {user?.fullName || user?.username}!
                    </h1>
                    <p className="text-gray-500">Manage your blogs and content</p>
                </div>
                </div>
                <button
                onClick={() => navigate('/create-blog')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium shadow-md hover:shadow-lg"
                >
                <FiPlus className="text-xl" />
                Create New Blog
                </button>
            </div>
            </div>

            {/* Total Blog Count Card */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Blogs</h3>
                <p className="text-3xl font-bold text-gray-900">{blogs.length}</p>
            </div>
            </div>

            {/* Blogs List */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Blogs</h2>

            {blogs.length === 0 ? (
                <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                    You haven't created any blogs yet
                </p>
                <button
                    onClick={() => navigate('/create-blog')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium"
                >
                    <FiPlus className="text-xl" />
                    Create Your First Blog
                </button>
                </div>
            ) : (
                <div className="space-y-4">
                {blogs.map((blog) => (
                    <div
                    key={blog._id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Blog Image */}
                        {blog.blogImage && (
                        <img
                            src={blog.blogImage}
                            alt={blog.title}
                            className="w-full lg:w-48 h-32 object-cover rounded-lg"
                        />
                        )}

                        {/* Blog Info */}
                        <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-600 transition-colors">
                            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                            </h3>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                            {blog.description?.substring(0, 150)}...
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                            <BiCalendar className="text-lg" />
                            {formatDate(blog.createdAt)}
                            </span>
                            <span className="px-2 py-1 bg-teal-50 text-teal-600 rounded">
                            {blog.category}
                            </span>
                        </div>

                        {/* Action Buttons*/}
                        <div className="flex gap-2">
                            <Link
                            to={`/blog/${blog._id}`}
                            className="flex items-center gap-1 px-3 sm:px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                            <FiEye />
                            <span className="hidden sm:inline">View</span>
                            </Link>
                            <button
                            onClick={() => navigate(`/edit-blog/${blog._id}`)}
                            className="flex items-center gap-1 px-3 sm:px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                            <FiEdit2 />
                            <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="flex items-center gap-1 px-3 sm:px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                            <FiTrash2 />
                            <span className="hidden sm:inline">Delete</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
        </div>
    )
}

export default Dashboard
