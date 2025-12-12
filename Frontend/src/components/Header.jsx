import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from './Container.jsx'
import { toast } from 'react-toastify'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { FiUser, FiPlus } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const LOGOUT_ENDPOINT = `${API_BASE_URL}/api/users/logout`
const CURRENT_USER_ENDPOINT = `${API_BASE_URL}/api/users/current-user`

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    const checkAuthStatus = async () => {
    try {
        const res = await fetch(CURRENT_USER_ENDPOINT, {
            method: 'GET',
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            if (data.success === true && data.data) {
            setIsLoggedIn(true)
            setUser(data.data)
            } else {
            setIsLoggedIn(false)
            setUser(null)
            }
        } else {
            setIsLoggedIn(false)
            setUser(null)
        }
        } catch (e) {
        console.error('Auth check failed:', e)
        setIsLoggedIn(false)
        setUser(null)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [location.pathname])

    const handleLogout = async () => {
        try {
        const result = await fetch(LOGOUT_ENDPOINT, {
            method: 'POST',
            credentials: 'include'
        })

        setIsLoggedIn(false)
        setUser(null)
        setIsMenuOpen(false)
        toast.success('Logged Out Successfully')
        navigate('/')
        } catch (e) {
        console.error(e)
        toast.error('Logout failed')
        }
    }

    return (
    <>
        <header className="mt-2 mb-2">
            <Container>
            <nav className="flex items-center justify-between">
                <div className="w-[90px] items-center">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-full h-full" />
                </Link>
                </div>

                <ul className="flex items-center gap-2 text-xs sm:text-base">
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

                {/* Menu Icon Button */}
                <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Open menu"
                >
                <HiMenuAlt3 className="text-3xl text-gray-700" />
                </button>
            </nav>
            </Container>
        </header>

        {/* Backdrop */}
        {isMenuOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Slide-in Panel */}
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            {/* Close Button */}
            <div className="flex justify-end p-4">
            <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
            >
                <IoClose className="text-3xl text-gray-700" />
            </button>
            </div>

            {/* Panel Content */}
            <div className="px-6 py-4">
            {isLoggedIn ? (
                <>
                {/* User Info */}
                <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center mb-4">
                    {user?.avatar ? (
                        <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <FiUser className="text-4xl text-white" />
                    )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {user?.fullName || user?.username || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                {/* Menu Options */}
                <div className="mt-6 space-y-3">
                    {/* Create Blog */}
                    <button
                    onClick={() => {
                        navigate('/create-blog')
                        setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium shadow-md flex items-center gap-2"
                    >
                    <FiPlus className="text-xl" />
                    Create Blog
                    </button>

                    <button
                    onClick={() => {
                        navigate('/dashboard')
                        setIsMenuOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                    Dashboard
                    </button>

                    <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                    Logout
                    </button>
                </div>
                </>
            ) : (
                <>
                {/* Not Logged In */}
                <div className="flex flex-col items-center py-8">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <FiUser className="text-4xl text-gray-500" />
                    </div>
                    <p className="text-gray-600 mb-6">You are not logged in</p>
                    <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-6 py-3 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                    Login
                    </Link>
                </div>
                </>
            )}
            </div>
        </div>
        </>
    )
}

export default Header