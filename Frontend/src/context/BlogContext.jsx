import { createContext } from "react";
import { blogData } from "../assets/dummyBlogdata";

export const BlogContext = createContext();

function BlogContextProvider({children}){
    const contextValue = {blogData};
    return(
        <BlogContext.Provider value={contextValue}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider;