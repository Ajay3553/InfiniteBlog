import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const WEBFORM_URL = import.meta.env.VITE_WEBFORM_API_URL
const WEBFORM_ACCESS_KEY = import.meta.env.VITE_WEBFORM_ACCESS_KEY

function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    if(!WEBFORM_ACCESS_KEY || !WEBFORM_URL){
      toast.error("Something Went Wrong Might be Internal Issue")
    }
    try {
      const response = await fetch(WEBFORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEBFORM_ACCESS_KEY,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: 'Blog Contact Form',
          to_email: 'ajaysingh.102007@gmail.com'
        })
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Message sent successfully! We will get back to you soon.')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message. Please try again or contact us directly.')
    }
  }

  return (
    <div>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <div className='flex justify-center mb-4'>
          <h1 className='text-4xl font-bold px-2 py-2'>Get in Touch</h1>
        </div>

        <div className='text-center mb-12'>
          <p className='text-lg text-gray-600'>
            Have questions or feedback? We'd love to hear from you. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6 mb-12'>
          <div className='border border-gray-200 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300'>
            <div className='flex justify-center mb-4'>
              <div className='bg-teal-100 p-4 rounded-full'>
                <svg className='w-8 h-8 text-teal-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
              </div>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Call Us</h3>
            <a href='tel:+918287531104' className='text-teal-600 font-semibold hover:text-teal-700'>
              +91 8287531104
            </a>
          </div>

          <div className='border border-gray-200 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300'>
            <div className='flex justify-center mb-4'>
              <div className='bg-teal-100 p-4 rounded-full'>
                <svg className='w-8 h-8 text-teal-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Email Us</h3>
            <p className='text-gray-600 mb-2'>You will get respond within 24 hours</p>
            <a href='mailto:ajaysingh.102007@gmail.com' className='text-teal-600 font-semibold hover:text-teal-700'>
              ajaysingh.102007@gmail.com
            </a>
          </div>
        </div>

        <div className='bg-gray-50 p-8 rounded-lg'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='max-w-2xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>Your Name *</label>
                <input
                  type='text'
                  id='name'
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                  placeholder='John Doe'
                />
                {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Your Email *</label>
                <input
                  type='email'
                  id='email'
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                  placeholder='john@example.com'
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
              </div>
            </div>

            <div className='mb-6'>
              <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-2'>Subject *</label>
              <input
                type='text'
                id='subject'
                {...register('subject', { required: 'Subject is required', minLength: { value: 5, message: 'Subject must be at least 5 characters' } })}
                className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                placeholder='How can we help you?'
              />
              {errors.subject && <p className='text-red-500 text-sm mt-1'>{errors.subject.message}</p>}
            </div>

            <div className='mb-6'>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>Message *</label>
              <textarea
                id='message'
                {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                rows='6'
                className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none`}
                placeholder='Tell us more about your inquiry...'
              ></textarea>
              {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>}
            </div>

            <div className='text-center'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
