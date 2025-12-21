import React, { useContext, useEffect, useState, useRef } from 'react'
import { BlogContext } from '../../context/BlogContext'
import { useParams, Link, useLocation } from 'react-router-dom'
import { BiCalendar, BiUser } from 'react-icons/bi'

function SingleBlog() {
  const { id } = useParams()
  const location = useLocation()
  const { blogData, loading, error, refetchBlogs } = useContext(BlogContext)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const hasRefreshed = useRef(false)

  useEffect(() => {
    const refresh = async () => {
      if (location.state?.refresh && !hasRefreshed.current) {
        hasRefreshed.current = true
        setIsRefreshing(true)
        await refetchBlogs()
        setIsRefreshing(false)
        window.history.replaceState({}, document.title)
      }
    }
    refresh()
  }, [location.state?.refresh])

  useEffect(() => {
    hasRefreshed.current = false
  }, [id])

  if (loading || isRefreshing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">
            {isRefreshing ? 'Refreshing Blog...' : 'Loading Blog...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link
            to="/blogs"
            className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  const blog = blogData.find((b) => b._id === id)

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl text-gray-700 font-semibold">Blog not found</p>
        <p className="text-gray-500 mb-4">
          The blog you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blogs"
          className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
        >
          Back to Blogs
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Cover Image */}
        {blog.blogImage && (
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={blog.blogImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        {/* Blog Content Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          {/* Category Badge */}
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author & Date Info */}
          <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b-2 border-gray-100">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={blog.author?.avatar || '/default-avatar.png'}
                alt={blog.author?.username}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-100"
              />
              <div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-0.5">
                  <BiUser className="text-sm" />
                  <span>Author</span>
                </div>
                <p className="font-semibold text-gray-900">
                  {blog.author?.username || 'Unknown Author'}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <BiCalendar className="text-xl text-teal-500" />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
          </div>

          {/* Blog Description/Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {blog.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
