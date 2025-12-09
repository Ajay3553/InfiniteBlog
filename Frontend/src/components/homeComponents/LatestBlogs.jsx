import { useContext } from 'react'
import { BlogContext } from '../../context/BlogContext.jsx'
import BlogCard from '../BlogCard.jsx'

function LatestBlogs() {
  const { blogData, loading, error } = useContext(BlogContext)
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading latest blogs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const latestThree = [...blogData].slice(-3).reverse()

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold px-2 py-2">Latest Blogs</h1>
      </div>

      <div className="w-full flex flex-wrap justify-center items-stretch gap-4 pt-8 pb-8 px-4">
        {latestThree.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            blogImage={blog.blogImage}
            category={blog.category}
            author_name={blog.author?.username}
            author_image={blog.author?.avatar}
            date={blog.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestBlogs
