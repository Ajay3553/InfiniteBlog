import React, { useContext } from 'react'
import HomeFront from '../components/homeComponents/HomeFront'
import BlogCard from '../components/BlogCard'
import { BlogContext } from '../context/BlogContext'

function Blogs() {
  const {blogData} = useContext(BlogContext)
  return (
    <div className=''>
      <HomeFront />
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold px-2 py-2">All Blogs</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center items-stretch gap-4 pt-8 pb-8 px-4">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog.id}
            title={blog.title}
            blogImage={blog.blogImage}
            category={blog.category}
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  )
}

export default Blogs