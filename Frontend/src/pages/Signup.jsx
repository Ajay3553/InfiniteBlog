import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../assets/logo.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const REGISTER_ENDPOINT = `${API_BASE_URL}/api/users/register`

function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const passwordValue = watch('password')

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('fullName', data.fullName)
      formData.append('email', data.email)
      formData.append('username', data.username)
      formData.append('password', data.password)

      if (data.avatar && data.avatar[0]) {
        formData.append('avatar', data.avatar[0])
      }

      const response = await fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Signup failed')
      }

      toast.success(result.message || 'Account created successfully!')
      reset()
      navigate('/', { replace: true })
    } catch (e) {
      console.error('Signup error:', e)
      toast.error(e.message || 'Signup failed, try again.')
    }
  }

  return (
    <div className="min-h-[120vh] h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-semibold mb-1 text-center">Create account</h1>

        <div className="w-[90px] mx-auto mb-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Profile Image */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Image *
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded outline-none text-sm"
              {...register('avatar', {
                required: 'Profile image is required'
              })}
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your Name"
              className={`w-full px-4 py-2 border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('fullName', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Minimum 2 characters' }
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username *
            </label>
            <input
              id="username"
              type="text"
              placeholder="yourusername"
              className={`w-full px-4 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Minimum 3 characters' }
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password *
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) =>
                  val === passwordValue || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </button>

          <div className="flex justify-center mt-4 text-center gap-2">
            <span className="text-sm">Already have an account?</span>
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline hover:text-blue-800 duration-300 font-semibold"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
