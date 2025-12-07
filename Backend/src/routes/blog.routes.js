import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { allBlogs, createBlog, deleteBlog, updateBlog, userBlogs } from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/all').get(allBlogs)



// secured Routes
router.route('/create').post(
    verifyJWT, 
    upload.fields(
        [
            {
                name: "blogImage",
                maxCount: 1
            }
        ]
    ),
    createBlog
);
router.route("/user/delete/:id").delete(verifyJWT, deleteBlog);
router.route("/user/blogs").get(verifyJWT, userBlogs);
router.route("/user/update/:id").patch(
    verifyJWT,
    upload.fields(
        [
            {
                name: "blogImage",
                maxCount: 1
            },
        ]
    ),
    updateBlog
);

export default router;