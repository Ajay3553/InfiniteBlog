import dotenv from 'dotenv'
import {app} from './app.js'
import connectDB from './db/connectDB.js'

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    const porting = process.env.PORT || 7000;
    app.listen(porting, () => {
        console.log(`Server is running on port : ${porting}`);
    })
})
.catch((e) => {
    console.log("MONGODB db connection Failed !! ", e);
})