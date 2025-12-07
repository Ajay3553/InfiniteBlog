import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from './Container.jsx'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const LOGOUT_ENDPOINT = `${API_BASE_URL}/api/users/logout`

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    const location = useLocation();

    const checkAuthCookie = () => {
        const hasToken = document.cookie
        .split('; ')
        .some((row) => row.startsWith('accessToken='));

        setIsLoggedIn(hasToken);
    }

    useEffect(() => {
        checkAuthCookie()
    }, [location.pathname])

    const handleLogout = async () => {
        try{
            const result = await fetch(LOGOUT_ENDPOINT, {
                method: 'POST',
                credentials: 'include'
            })

            setIsLoggedIn(false)
            toast.success("Logged Out Successfully")
            navigate('/')
        }
        catch(e){
            console.error(e);
        }
    }

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
                                <Link 
                                to={item.slug} 
                                className="inline-block mx-2 cursor-pointer hover:text-blue-500 hover:text-[18px] duration-400"
                                >
                                {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    
                    {isLoggedIn ? (
                        <button
                        onClick={handleLogout}
                        className="inline-block text-xs sm:text-base px-5 py-2 cursor-pointer rounded-3xl text-white bg-red-400 hover:bg-red-600 hover:text-gray-100 duration-400"
                        >
                        Logout
                        </button>
                    ) : (
                        <Link
                        to="/login"
                        className="inline-block text-xs sm:text-base px-5 py-2 cursor-pointer rounded-3xl text-white bg-blue-400 hover:bg-blue-600 hover:text-gray-300 duration-400"
                        >
                        Login
                        </Link>
                    )}
                </nav>
            </Container>
        </header>
    )
}

export default Header