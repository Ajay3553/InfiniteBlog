import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiLock, FiEye, FiEyeOff, FiSave, FiShield } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const CHANGE_PASSWORD_ENDPOINT = `${API_BASE_URL}/api/users/change-password`

function UpdateUserPassword() {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm()

    const newPassword = watch('newPassword')

    const onSubmit = async (data) => {
    try {
        setIsSubmitting(true)
        const payload = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        }
        const res = await fetch(CHANGE_PASSWORD_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text()
            console.error('Server returned non-JSON response:', text)
            throw new Error('Server error - received HTML instead of JSON')
        }

        const result = await res.json()
        console.log('Response data:', result)

        if (res.ok && result.success) {
            toast.success('Password changed successfully!')
            reset()
            navigate('/dashboard')
        } else {
            toast.error(result.message || 'Failed to change password')
        }
    } catch (e) {
        console.error('Password change failed:', e)
        toast.error('Failed to change password')
    } finally {
        setIsSubmitting(false)
    }
}


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl">
                        <FiShield className="text-2xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
                        <p className="text-gray-600">Keep your account secure</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Security Notice */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                    <FiShield className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Security Tips</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Use at least 8 characters</li>
                            <li>• Mix uppercase, lowercase, numbers & symbols</li>
                            <li>• Don't reuse old passwords</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Old Password */}
            <div className="mb-6">
                <label htmlFor="oldPassword" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiLock className="text-gray-500" />
                    Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        id="oldPassword"
                        {...register('oldPassword', {
                            required: 'Current password is required'
                        })}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        placeholder="Enter your current password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                    >
                        {showOldPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                    </button>
                </div>
                {errors.oldPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.oldPassword.message}</p>
                )}
            </div>

            <div className="h-px bg-gray-200 mb-6"></div>

            {/* New Password */}
            <div className="mb-6">
                <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiLock className="text-gray-500" />
                    New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        {...register('newPassword', {
                            required: 'New password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: 'Password must contain uppercase, lowercase, and number'
                            }
                        })}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        placeholder="Enter new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                    >
                        {showNewPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                    </button>
                </div>
                {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                )}
            </div>

            {/* Confirm New Password */}
            <div className="mb-8">
                <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiLock className="text-gray-500" />
                    Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        {...register('confirmPassword', {
                            required: 'Please confirm your new password',
                            validate: (value) =>
                                value === newPassword || 'Passwords do not match'
                        })}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        placeholder="Re-enter new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                    >
                        {showConfirmPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
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
                    {isSubmitting ? 'Changing Password...' : 'Change Password'}
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

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                    <strong>Note:</strong> After changing your password, you may need to log in again on other devices.
                </p>
            </div>
        </div>
        </div>
    )
}

export default UpdateUserPassword
