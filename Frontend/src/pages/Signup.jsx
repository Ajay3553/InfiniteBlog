import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { toast } from 'react-toastify'

function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  const passwordValue = watch('password')

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000))
      console.log('Signup data:', data)
      toast.success('Account created successfully!')
      reset({ name: '', email: '', password: '', confirmPassword: '' })
      navigate('/', { replace: true })
    } catch (e) {
      console.error(e)
      toast.error('Signup failed, try again.')
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
          <div className='mb-4'>
            <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 mb-2'>
              Profile Image
            </label>
            <input type="file" className='w-full p-2 border border-gray-300 rounded outline-none text-sm' required/>
          </div>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Minimum 2 characters' }
              })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Example@gmail.com"
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email'
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === passwordValue || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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
            <Link to="/login" className="text-sm text-blue-600 hover:underline hover:text-blue-800 duration-300 font-semibold">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
