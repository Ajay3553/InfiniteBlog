import React, { useContext, useState, useMemo, useCallback, useTransition, memo } from 'react'
import { BlogContext } from '../context/BlogContext'
import { Link } from 'react-router-dom'
import { BiCalendar, BiUser, BiSearch } from 'react-icons/bi'

// Memoized BlogCard
const BlogCard = memo(({ blog }) => {
  const [avatarError, setAvatarError] = useState(false)
  
  const formattedDate = useMemo(() => 
    new Date(blog.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }), [blog.createdAt]
  )

  const handleAvatarError = useCallback(() => {
    setAvatarError(true)
  }, [])

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Blog Image */}
      {blog.blogImage && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={blog.blogImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full uppercase">
              {blog.category}
            </span>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors break-words">
          {blog.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 break-words overflow-hidden">
          {blog.description}
        </p>


        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {!avatarError && blog.author?.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author?.username || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 flex-shrink-0"
                loading="lazy"
                onError={handleAvatarError}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {blog.author?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <span className="font-medium text-gray-700 truncate">
              {blog.author?.username || 'Anonymous'}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <BiCalendar className="text-teal-500" />
            <span className="whitespace-nowrap">{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
})

BlogCard.displayName = 'BlogCard'

function AllBlogs() {
  const { blogData, loading, error } = useContext(BlogContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isPending, startTransition] = useTransition()

  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const filteredBlogs = useMemo(() => {
    return blogData.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || blog.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [blogData, debouncedSearch, selectedCategory])

  const categories = useMemo(() => {
    const cats = new Set(blogData.map(blog => blog.category))
    return ['All', ...Array.from(cats)]
  }, [blogData])

  const handleSearchChange = useCallback((e) => {
    startTransition(() => {
      setSearchTerm(e.target.value)
    })
  }, [])

  const handleCategoryChange = useCallback((category) => {
    startTransition(() => {
      setSelectedCategory(category)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading Blogs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Our Blogs</h1>
          <p className="text-gray-600">Discover stories, thinking, and expertise</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search blogs by title or description..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
            {isPending && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center text-gray-600">
          Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllBlogs
