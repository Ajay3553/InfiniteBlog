import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// CORS configuration
app.use(cors());

// Body Parser middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes import
import userRouter from './routes/user.routes.js'

//Routes Declaration
app.use('/api/users', userRouter)

// http://localhost:8000/api/users/register

export {app}