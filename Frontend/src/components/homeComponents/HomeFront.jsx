import React from 'react'
import HomeFrontImg from '../../assets/homeFront.jpg'
import { FiSearch, FiEdit, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function HomeFront() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={HomeFrontImg}
          alt="Blog Hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          {/* Animated Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            style={{ animation: 'fadeInDown 0.8s ease-out' }}
          >
            <FiTrendingUp className="text-teal-400" />
            <span className="text-white text-sm font-medium">
              Join thousands of readers worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}
          >
            Discover Stories That{' '}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Inspire
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed"
            style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
          >
            Explore insightful articles, share your thoughts, and connect with a community of passionate writers and readers.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}
          >
            <Link
              to="/blogs"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <FiSearch className="text-xl" />
              <span>Explore Blogs</span>
            </Link>

            <Link
              to="/create-blog"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
            >
              <FiEdit className="text-xl" />
              <span>Start Writing</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

      {/* Floating Shapes */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-teal-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default HomeFront
