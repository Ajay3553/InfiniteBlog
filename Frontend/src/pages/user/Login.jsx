import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/users/login`

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: { email: '', password: '' }
  })

  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setServerError('')

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        credentials: 'include'
      })

      const contentType = response.headers.get('content-type') || ''
      let result = null

      if (contentType.includes('application/json')) {
        result = await response.json()
      } else {
        setServerError('Wrong Email or Password')
        return
      }

      toast.success(result.message || 'Logged in successfully!')
      reset({ password: '' })
      navigate('/', { replace: true })
    } catch (e) {
      console.error('Login error:', e)
      setServerError('Login failed, please try again later.')
    }
  }

  return (
    <div className="min-h-[60vh] h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-1 text-center">Login</h1>
        <div className="w-[90px] mx-auto mb-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email'
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              className={`w-full px-4 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Auth / server error */}
          {serverError && (
            <p className="text-red-500 text-sm mb-3 text-center">{serverError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors cursor-pointer ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="flex justify-center pt-4 gap-2">
            <p className="text-sm text-center">Don't have an account?</p>
            <Link
              to="/register"
              className="text-sm text-center font-semibold text-blue-600 hover:underline hover:text-blue-800 duration-300"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
