import { useContext } from "react";
import { BlogContext } from '../../context/BlogContext.jsx';
import BlogCard from "../BlogCard.jsx";

function LatestBlogs() {
  const {blogData} = useContext(BlogContext);
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold px-2 py-2">Latest Blogs</h1>
      </div>
      <div className="w-full flex flex-wrap justify-center items-stretch gap-4 pt-8 pb-8 px-4">
        {blogData.slice(-3).reverse().map((blog, index) => (
          <BlogCard
            key={index}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestBlogs;
