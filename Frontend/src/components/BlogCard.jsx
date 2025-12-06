import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({
  id,
  title,
  category,
  image,
  author_image,
  author_name,
  date,
}) {
  return (
    <div className='flex-[1_1_300px] max-w-[400px] border border-gray-200 shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow hover:scale-101 duration-300'>
      <Link to={`/blog/${id}`}>
        <img
          src={image}
          alt={title}
          className='w-full h-48 object-cover rounded-t-lg mb-4'
        />
      </Link>
      <p className='text-sm text-gray-600 mb-2'>{category}</p>
      <h1 className='text-xl font-semibold text-gray-900 mb-3'>{title}</h1>
      <div className='flex items-center space-x-3 text-sm text-gray-500'>
        <img
          src={author_image}
          alt={author_name}
          className='w-8 h-8 rounded-full'
        />
        <div>
          <p className='font-medium text-gray-700'>{author_name}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
