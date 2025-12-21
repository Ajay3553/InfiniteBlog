import React, { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { FiSave, FiUpload, FiX } from "react-icons/fi"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

function EditBlog() {
  const { blogId } = useParams()
  const navigate = useNavigate()

  const GET_BLOG_ENDPOINT = useMemo(
    () => `${API_BASE_URL}/api/blogs/user/blog/getBlog/${blogId}`,
    [blogId]
  )
  const UPDATE_BLOG_ENDPOINT = useMemo(
    () => `${API_BASE_URL}/api/blogs/user/blog/update/${blogId}`,
    [blogId]
  )

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [coverPreview, setCoverPreview] = useState(null)
  const [existingBlogImage, setExistingBlogImage] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      blogImage: null,
    },
  })

  const blogImageFile = watch("blogImage")

  useEffect(() => {
    if (blogImageFile && blogImageFile[0]) {
      const file = blogImageFile[0]
      const url = URL.createObjectURL(file)
      setCoverPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setCoverPreview(existingBlogImage)
    }
  }, [blogImageFile, existingBlogImage])

  useEffect(() => {
    if (!blogId) {
      toast.error("Blog id missing in URL")
      navigate("/dashboard")
      return
    }

    const fetchBlog = async () => {
      try {
        setLoading(true)

        const res = await fetch(GET_BLOG_ENDPOINT, {
          method: "GET",
          credentials: "include",
        })

        const contentType = res.headers.get("content-type") || ""
        if (!contentType.includes("application/json")) {
          const text = await res.text()
          console.error("Non-JSON response:", text)
          toast.error("Server returned invalid response")
          return
        }

        const data = await res.json()

        if (!res.ok || !data?.success) {
          toast.error(data?.message || "Failed to load blog")
          return
        }

        const blog = data.data

        reset({
          title: blog?.title || "",
          description: blog?.description || "",
          category: blog?.category || "",
          blogImage: null,
        })

        const imageUrl = blog?.blogImage?.url || blog?.blogImage || null
        setExistingBlogImage(imageUrl)
        setCoverPreview(imageUrl)

      } catch (err) {
        console.error("Fetch error:", err)
        toast.error("Failed to load blog")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId, GET_BLOG_ENDPOINT, navigate, reset])

  const removeNewImageSelection = () => {
    setValue("blogImage", null)
  }

  const onSubmit = async (form) => {
    try {
      setSaving(true)

      const fd = new FormData()
      fd.append("newTitle", form.title)
      fd.append("newDescription", form.description)
      fd.append("newCategory", form.category || "")

      if (form.blogImage && form.blogImage[0]) {
        fd.append("blogImage", form.blogImage[0])
      }

      const res = await fetch(UPDATE_BLOG_ENDPOINT, {
        method: "PATCH",
        credentials: "include",
        body: fd,
      })

      const contentType = res.headers.get("content-type") || ""
      if (!contentType.includes("application/json")) {
        const text = await res.text()
        console.error("Non-JSON response:", text)
        toast.error("Server returned invalid response")
        return
      }

      const data = await res.json()

      if (!res.ok || !data?.success) {
        toast.error(data?.message || "Failed to update blog")
        return
      }

      toast.success(data?.message || "Blog updated successfully")
      navigate(`/blog/${blogId}`, { state: { refresh: true } })
    } catch (err) {
      console.error(err)
      toast.error("Failed to update blog")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
          <p className="text-gray-600">Update your blog and save changes.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Cover image */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-64">
                <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 border">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      No cover image
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="blogImage"
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium border border-gray-200"
                >
                  <FiUpload />
                  {existingBlogImage ? 'Change image' : 'Choose image'}
                </label>

                <input
                  id="blogImage"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  {...register("blogImage", {
                    validate: {
                      fileSize: (files) => {
                        if (!files || !files[0]) return true
                        return files[0].size <= 3 * 1024 * 1024 || "Max file size is 3MB"
                      },
                    },
                  })}
                />

                {blogImageFile?.[0] && (
                  <button
                    type="button"
                    onClick={removeNewImageSelection}
                    className="ml-3 inline-flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium border border-red-100"
                  >
                    <FiX />
                    Cancel change
                  </button>
                )}

                {errors.blogImage && (
                  <p className="mt-2 text-sm text-red-600">{errors.blogImage.message}</p>
                )}

                <p className="mt-2 text-xs text-gray-500">JPG/PNG/WEBP up to 3MB.</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              placeholder="Blog title"
              {...register("title", { required: "Title is required", minLength: { value: 3, message: "Min 3 chars" } })}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Category */}
            <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
            </label>
            <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition bg-white"
            >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Science">Science</option>
                <option value="Space">Space</option>
                <option value="Other">Other</option>
            </select>
            {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
            </div>
          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={12}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-y"
              placeholder="Write your blog description..."
              {...register("description", { required: "Description is required", minLength: { value: 20, message: "Min 20 chars" } })}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSave />
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog
