# Infinite – MERN Stack Blog Application

A MERN stack blogging platform built with React (frontend) and Node.js/Express/MongoDB (backend).  
The frontend is complete and the backend is being built with JWT auth, image uploads, and paginated blog APIs.

---

## Features

### Frontend

- SPA built with React and Vite
- Client-side routing for:
  - Home, Blogs, Single Blog
  - About, Contact
  - Login, Signup
- Blog listing and single-blog view using reusable components
- Global blog context for sharing data across pages
- Contact form powered by `react-hook-form` and Web3Forms API
- Toast notifications for user feedback
- Responsive layout using utility-class based CSS

### Backend

- RESTful API built with Express
- MongoDB with Mongoose models for users and blogs
- Secure auth:
  - Password hashing with bcrypt
  - JWT-based authentication and authorization
  - HTTP-only cookies for token storage
- File uploads:
  - `multer` for multipart/form-data
  - Cloudinary SDK for image uploads
- Paginated blog queries using `mongoose-aggregate-paginate-v2`
- Centralized error and response helpers
- Environment variables handled using `dotenv`
- Auto-reload during development with `nodemon`
- CORS setup for frontend–backend communication


---

## Backend Dependencies (Overview)

- **bcrypt** – secure password hashing  
- **cloudinary** – cloud image upload and management  
- **cookie-parser** – read cookies (e.g., JWT)  
- **cors** – enable frontend ↔ backend communication  
- **dotenv** – environment variable handling  
- **express** – HTTP server and routing  
- **jsonwebtoken** – create/verify JWT tokens  
- **mongoose** – MongoDB ODM for defining models and queries  
- **mongoose-aggregate-paginate-v2** – aggregation + pagination helper  
- **multer** – image upload middleware for `multipart/form-data`  
- **nodemon** – auto-reload during development  

---
