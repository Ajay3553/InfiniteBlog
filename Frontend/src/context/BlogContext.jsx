import { createContext, useEffect, useState, useCallback, useMemo } from "react";

export const BlogContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const ALL_BLOG_ENDPOINT = `${API_BASE_URL}/api/blogs/all`

function BlogContextProvider({children}){
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize fetch function
    const fetchAllBlogs = useCallback(async() => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(ALL_BLOG_ENDPOINT);
            const contentType = res.headers.get('content-type') || '';
            if(!contentType.includes('application/json')){
                throw new Error('Unexpected response type');
            }

            const result = await res.json();
            if(!res.ok || !result?.success){
                throw new Error(result?.message || 'Failed to Load Blogs');
            }
            setBlogData(result?.data || []);
        } catch (e) {
            console.log("Error in allBlog API", e);
            setError(e.message || 'Failed to Load Blogs');
            setBlogData([]);
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAllBlogs()
    }, [fetchAllBlogs]);

    // Memoize refetch function
    const refetchBlogs = useCallback(async () => {
        await fetchAllBlogs()
    }, [fetchAllBlogs])

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        blogData, 
        loading, 
        error, 
        refetchBlogs
    }), [blogData, loading, error, refetchBlogs]);

    return(
        <BlogContext.Provider value={contextValue}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;
