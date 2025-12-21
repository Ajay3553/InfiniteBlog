import { Router } from 'express';
import {upload} from '../middleware/multer.middleware.js';
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserInfo } from '../controllers/user.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(
    upload.fields(
        [
            {
                name: "avatar",
                maxCount: 1
            }
        ]
    ),
    registerUser
)

router.route('/login').post(loginUser)

// secured Routes
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJWT, changeCurrentPassword)
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route('/update-info').patch(
    verifyJWT,
    upload.fields(
        [
            {
                name:'avatar',
                maxCount: 1,
            }
        ]
    ),
    updateUserInfo
)

export default router