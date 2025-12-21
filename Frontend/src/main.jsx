import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/user/Login.jsx'
import Signup from './pages/user/Signup.jsx'
import SingleBlog from './pages/blog/SingleBlog.jsx'
import Dashboard from './pages/user/Dashboard.jsx'
import CreateBlog from './pages/blog/CreateBlog.jsx'
import UpdatePersonalInfo from './pages/user/UpdatePersonalInfo.jsx'
import UpdateUserPassword from './pages/user/UpdateUserPassword.jsx'
import EditBlog from './pages/blog/EditBlog.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Signup />
      },
      {
        path: '/blog/:id',
        element: <SingleBlog />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/create-blog',
        element: <CreateBlog />
      },
      {
        path: '/update-personal-info',
        element: <UpdatePersonalInfo />
      },
      {
        path: '/change-password',
        element: <UpdateUserPassword />
      },
      {
        path: '/edit-blog/:blogId',
        element: <EditBlog />
      }
    ]
  }
])

import BlogContextProvider from './context/BlogContext.jsx'
createRoot(document.getElementById('root')).render(
  <BlogContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </BlogContextProvider>
)
