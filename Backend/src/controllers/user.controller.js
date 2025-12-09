import { asyncHandler } from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {apiError} from '../utils/apiError.js';
import {apiResponse} from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';

const options = {
    httpOnly: true,        // JS (and XSS) cannot read tokens
    secure: true,          // only over HTTPS
    sameSite: 'lax',       // or 'none' with CSRF protection if cross-site
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
}


const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken};
    }
    catch(e){
        throw new apiError(500, "Something went wrong while generating Access and Refresh Token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, username, password} = req.body; // get user Data from frontend
    if([fullName, email, username, password].some((field) => field?.trim() == " ")){ // Validation
        throw new apiError(400, "All Fields are Required")
    }

    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser)  throw new apiError(400, "User with Email or Username already exist"); // Validation
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if(!avatarLocalPath) throw new apiError(400, "Avatar file is Required"); // Validation : since Avatar is a required field
    const avatar = await uploadOnCloudinary(avatarLocalPath); // upload to cloudinary
    if(!avatar) throw new apiError(400, "Avatar file is Required"); // validation
    
    const user = await User.create({
        fullName,
        avatar : avatar.url,
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select( // remove password and refreshToken field from response
        "-password -refreshToken" // user will not send the password and refreshToken since it should be privateand other data will be send to DB
    );

    if(!createdUser) throw new apiError(500, "Something Went Wrong While Registering the User"); // Validation

    return res.status(201).json(
        new apiResponse(200, createdUser, "User Registered Successfully")
    )
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body; // User data from Frontend
    if(!(username || email)) throw new apiError(400, "username or email is required"); // Validation
    const credentials = [];
    if(username) credentials.push({username});
    if(email) credentials.push({email});
    
    const user = await User.findOne({$or: credentials}); // Get currUser

    if(!user) throw new apiError(404, "User does not Exist"); // Validation

    const isPasswordValid = await user.isPasswordCorrect(password);  //Valildate User Password
    if(!isPasswordValid) throw new apiError(401, "Invalid User Credentials"); //Validation

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id); // generate Tokens for curr session
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken"); // Logged the user

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User Logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, // get User id from currUser
        {
            $set: {
                refreshToken: undefined  // Remove RefreshToken as session is expired
            }
        },
        {
            new : true
        }
    )

    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
        new apiResponse(
            200,
            {},
            "User Logged Out"
        )
    )
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken; // get curr RefreshToken
    if(!incomingRefreshToken) throw new apiError(401, "unauthorized request"); // Validation

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id); // get user

        if(!user){
            throw new apiError(401, "Invalid refresh Token") // Validation
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new apiError(401, "Refresh Token expired") // Validation
        }

        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id); // get New RefreshToken

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new apiResponse(
                200,
                {accessToken, refreshToken : newRefreshToken},
                "Access token refreshed"
            )
        )
    }
    catch (e) {
        throw new apiError(401, e?.message || "Invalid Refresh Token");
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body; // Data from Frontend

    if(newPassword !== confirmPassword){ // Validation
        throw new apiError(400, "New Password and Confirm Password must be same")
    }

    const user = await User.findById(req.user?._id);
    const isCorrectPassword = await user.isPasswordCorrect(oldPassword);
    if(!isCorrectPassword){ // Valid User OldPassword
        throw new apiError(400, "Wrong Password");
    }

    user.password = newPassword; //updated Password
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            {},
            "Password Change Successfully"
        )
    )
})

// const updatedUser // TODO: Future update Dashboard for updating there personal info


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword
}