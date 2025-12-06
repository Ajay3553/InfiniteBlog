import React from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Container from './Container.jsx'

function Header() {
    const navItems = [
        {
            name: 'Home',
            slug: '/'
        },
        {
            name: 'Blogs',
            slug: '/blogs'
        },
        {
            name: 'About',
            slug: '/about'
        },
        {
            name: 'Contact',
            slug: '/contact'
        }
    ]
    const navigate = useNavigate();
  return (
        <header className='mt-2 mb-2'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='w-[90px] items-center'>
                        <Link to='/'>
                            <img src={logo} alt="Logo" className='w-full h-full'/>
                        </Link>
                    </div>
                    <ul className='flex items-center gap-2 text-xs sm:text-base'>
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a href={item.slug} className='inline-block mx-2 cursor-pointer hover:text-blue-500 hover:text-[18px] duration-400'>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="/login" className='inline-block text-xs sm:text-base px-5 py-2 cursor-pointer rounded-3xl text-white bg-blue-400 hover:bg-blue-600 hover:text-gray-300 duration-400'>
                        Login
                    </a>
                </nav>
            </Container>
        </header>
    )
}

export default Header