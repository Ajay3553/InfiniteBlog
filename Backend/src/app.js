import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const USER_URL = process.env.USER_URL || 'http://localhost:5173';

// CORS configuration
app.use(cors(
    {
        origin: USER_URL,
        credentials: true
    }
));

// Body Parser middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes import
import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'

//Routes Declaration
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

// http://localhost:8000/api/users/register

export {app}