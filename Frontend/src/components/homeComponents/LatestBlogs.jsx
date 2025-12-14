import { useContext } from 'react'
import { BlogContext } from '../../context/BlogContext.jsx'
import BlogCard from '../BlogCard.jsx'
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function LatestBlogs() {
  const { blogData, loading, error } = useContext(BlogContext)

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-lg">Loading latest blogs...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const latestThree = [...blogData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  if (latestThree.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-lg">No blogs available yet</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-200 rounded-full mb-6">
            <FiTrendingUp className="text-teal-600 text-lg" />
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wide">
              Fresh Content
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Latest <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Blogs</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the most recent stories, insights, and ideas from our community of writers
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestThree.map((blog, index) => (
            <div
              key={blog._id}
              className="transform transition-all duration-500 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
              }}
            >
              <BlogCard
                id={blog._id}
                title={blog.title}
                blogImage={blog.blogImage}
                category={blog.category}
                author_name={blog.author?.username}
                author_image={blog.author?.avatar}
                date={blog.createdAt}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {blogData.length > 3 && (
          <div className="text-center">
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <span>Explore All Blogs</span>
              <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default LatestBlogs
