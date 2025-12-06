import React from 'react'
import HomeFront from '../components/homeComponents/HomeFront'

function About() {
  return (
    <div>
      
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='flex justify-center mb-8'>
          <h1 className='text-4xl font-bold px-2 py-2'>About Us</h1>
        </div>

        {/* Our Story Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Our Story</h2>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Welcome to our blog! We started this platform with a simple mission: to share valuable insights, 
            stories, and knowledge with readers who are passionate about learning and growing. What began as 
            a personal project has evolved into a vibrant community of readers and contributors.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed'>
            Our journey started in 2024 when we realized there was a need for authentic, well-researched 
            content that speaks to real people. Since then, we've been dedicated to creating content that 
            informs, inspires, and engages our audience.
          </p>
        </section>

        {/* Mission Section */}
        <section className='mb-12 bg-gray-50 p-6 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
          <p className='text-lg text-gray-700 leading-relaxed'>
            We believe in the power of words to transform perspectives and connect people. Our mission is to 
            deliver high-quality, engaging content across various topics including technology, lifestyle, 
            personal development, and more. We strive to create a space where ideas flourish and conversations 
            matter.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6'>What We Offer</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='border border-gray-200 p-6 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-3'>Quality Content</h3>
              <p className='text-gray-600'>
                Well-researched articles and blog posts that provide real value to our readers.
              </p>
            </div>
            <div className='border border-gray-200 p-6 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-3'>Diverse Topics</h3>
              <p className='text-gray-600'>
                Coverage across multiple categories to cater to varied interests and curiosities.
              </p>
            </div>
            <div className='border border-gray-200 p-6 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-3'>Community Focus</h3>
              <p className='text-gray-600'>
                Building a community of engaged readers who share ideas and perspectives.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Our Values</h2>
          <ul className='space-y-3'>
            <li className='flex items-start'>
              <span className='text-teal-500 font-bold mr-3 text-xl'>✓</span>
              <div>
                <strong className='text-lg'>Authenticity:</strong>
                <span className='text-gray-700 ml-2'>We share genuine insights and honest perspectives.</span>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-500 font-bold mr-3 text-xl'>✓</span>
              <div>
                <strong className='text-lg'>Quality:</strong>
                <span className='text-gray-700 ml-2'>Every piece of content is carefully crafted and reviewed.</span>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-500 font-bold mr-3 text-xl'>✓</span>
              <div>
                <strong className='text-lg'>Growth:</strong>
                <span className='text-gray-700 ml-2'>We're committed to continuous improvement and learning.</span>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='text-teal-500 font-bold mr-3 text-xl'>✓</span>
              <div>
                <strong className='text-lg'>Community:</strong>
                <span className='text-gray-700 ml-2'>Building connections and fostering meaningful conversations.</span>
              </div>
            </li>
          </ul>
        </section>
        <section className='bg-teal-50 p-8 rounded-lg text-center'>
          <h2 className='text-2xl font-semibold mb-4'>Join Our Journey</h2>
          <p className='text-lg text-gray-700 mb-6'>
            Thank you for being part of our community. Whether you're a regular reader or just discovering us, 
            we're glad you're here. Stay connected and never miss an update!
          </p>
          <button className='bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300'>
            Subscribe to Our Blogs
          </button>
        </section>
      </div>
    </div>
  )
}

export default About
