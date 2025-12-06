import React from 'react'
import Container from './Container'

function Footer() {
  return (
    <footer className='py-6 mt-auto'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <p className='text-black text-sm hover:text-blue-400 duration-300'>
            © {new Date().getFullYear()} InfiniteBlog. All rights reserved.
          </p>
          <div className='flex gap-4 mt-4 md:mt-0 text-sm text-black'>
            <a href='/about' className='hover:text-blue-400 duration-300'>About</a>
            <a href='#' className='hover:text-blue-400 duration-300'>Terms</a>
            <a href='/contact' className='hover:text-blue-400 duration-300'>Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
