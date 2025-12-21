import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiUpload, FiX, FiUser, FiMail, FiSave } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const CURRENT_USER_ENDPOINT = `${API_BASE_URL}/api/users/current-user`
const UPDATE_USER_ENDPOINT = `${API_BASE_URL}/api/users/update-info`

function UpdatePersonalInfo() {
  const [user, setUser] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm()

  const avatarFile = watch('avatar')

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const file = avatarFile[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [avatarFile])

  const checkAuth = async () => {
    try {
      const res = await fetch(CURRENT_USER_ENDPOINT, {
        method: 'GET',
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()

        if (data.success && data.data) {
          setUser(data.data)
          // Pre-fill form with existing user data
          reset({
            fullName: data.data.fullName || '',
            username: data.data.username || '',
            email: data.data.email || ''
          })
          setAvatarPreview(data.data.avatar || null)
        } else {
          toast.error('Please login first')
          navigate('/login')
        }
      } else {
        toast.error('Please login first')
        navigate('/login')
      }
    } catch (e) {
      console.error('Auth check failed:', e)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      
      // Only append fields that have changed
      if (data.fullName !== user.fullName) {
        formData.append('newFullName', data.fullName)
      }
      if (data.email !== user.email) {
        formData.append('newEmail', data.email)
      }

      // Add avatar if user selected a new one
      if (data.avatar && data.avatar[0]) {
        formData.append('avatar', data.avatar[0])
      }

      const res = await fetch(UPDATE_USER_ENDPOINT, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      })

      const result = await res.json()

      if (res.ok && result.success) {
        toast.success('Profile updated successfully!')
        // Refresh user data
        await checkAuth()
        navigate('/dashboard')
      } else {
        toast.error(result.message || 'Failed to update profile')
      }
    } catch (e) {
      console.error('Update failed:', e)
      toast.error('Failed to update profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeAvatar = () => {
    setValue('avatar', null)
    setAvatarPreview(user?.avatar || null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Personal Information</h1>
          <p className="text-gray-600">Keep your profile information up to date</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Avatar Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Profile Picture
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Current Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center shadow-lg">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-white text-5xl" />
                  )}
                </div>
                {avatarFile && avatarFile[0] && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg"
                  >
                    <FiX className="text-lg" />
                  </button>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium border-2 border-dashed border-gray-300 hover:border-gray-400"
                >
                  <FiUpload className="text-xl" />
                  Choose New Picture
                </label>
                <input
                  type="file"
                  id="avatar"
                  {...register('avatar', {
                    validate: {
                      isImage: (files) => {
                        if (!files || !files[0]) return true
                        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
                        return validTypes.includes(files[0].type) || 'Only JPG, PNG, and WEBP images are allowed'
                      },
                      fileSize: (files) => {
                        if (!files || !files[0]) return true
                        return files[0].size <= 2 * 1024 * 1024 || 'Image must be less than 2MB'
                      }
                    }
                  })}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                />
                <p className="mt-2 text-sm text-gray-500">PNG, JPG, WEBP up to 2MB</p>
                {errors.avatar && (
                  <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200 mb-8"></div>

          {/* Full Name */}
          <div className="mb-6">
            <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiUser className="text-gray-500" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Full name must be at least 2 characters' }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username (Read-only) */}
          <div className="mb-6">
            <label htmlFor="username" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiUser className="text-gray-500" />
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              placeholder="johndoe"
            />
            <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
          </div>

          {/* Email */}
          <div className="mb-8">
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FiMail className="text-gray-500" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave className="text-xl" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Change Password Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/change-password')}
            className="text-teal-600 hover:text-teal-700 font-medium underline"
          >
            Want to change your password?
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePersonalInfo
