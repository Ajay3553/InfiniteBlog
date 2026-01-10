import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BlogContextProvider from './context/BlogContext.jsx'

// Lazy Loading - Code splitting for all routes
const Home = lazy(() => import('./pages/Home.jsx'))
const Blogs = lazy(() => import('./pages/Blogs.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Login = lazy(() => import('./pages/user/Login.jsx'))
const Signup = lazy(() => import('./pages/user/Signup.jsx'))
const SingleBlog = lazy(() => import('./pages/blog/SingleBlog.jsx'))
const Dashboard = lazy(() => import('./pages/user/Dashboard.jsx'))
const CreateBlog = lazy(() => import('./pages/blog/CreateBlog.jsx'))
const UpdatePersonalInfo = lazy(() => import('./pages/user/UpdatePersonalInfo.jsx'))
const UpdateUserPassword = lazy(() => import('./pages/user/UpdateUserPassword.jsx'))
const EditBlog = lazy(() => import('./pages/blog/EditBlog.jsx'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/blogs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: '/blog/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SingleBlog />
          </Suspense>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/create-blog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateBlog />
          </Suspense>
        ),
      },
      {
        path: '/update-personal-info',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UpdatePersonalInfo />
          </Suspense>
        ),
      },
      {
        path: '/change-password',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UpdateUserPassword />
          </Suspense>
        ),
      },
      {
        path: '/edit-blog/:blogId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EditBlog />
          </Suspense>
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <BlogContextProvider>
    <RouterProvider router={router} />
  </BlogContextProvider>
)
