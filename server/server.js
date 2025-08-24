import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/authRouter.js';
import contactRouter from './routes/contactRoute.js';
import coursesRouter from './routes/coursesRoute.js'
import connectDB from './utils/db.js';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddlewares.js';
import userRouter from './routes/userRoute.js';
import router from './routes/router.js';
import adminRouter from './routes/adminRouter.js';
import progressRouter from './routes/progressRoute.js';
import activityRouter from './routes/activityRoute.js';
import LearderBoardRouter from './routes/LeaderBoardRoute.js'
dotenv.config();
const app= express();
// Allow all origins
const corsOption = {
    origin: "*",   // any domain can access
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false
};
app.use(cors(corsOption));

// // using cors
// const corsOption = {
//     // origin:"https://bitwise-learning.netlify.app",
//     origin:process.env.CLIENT_CORS,
//     methods:"POST , PUT , GET , DELETE , PATCH ,HEAD",
//     credentials:false
// }
// app.use(cors(corsOption));
// https://bitwise-backend.onrender.com/api/v1/auth/login
app.use(express.json());
app.use("/api/v1/auth",authRouter);
app.use("/contact",contactRouter);
app.use("/user",userRouter);
app.use("/api/v1/courses",coursesRouter);
app.use("/progress",progressRouter);
app.use("/activity",activityRouter);
app.use("/",router)
app.use("/admin",adminRouter);
app.use("/api/v1",LearderBoardRouter);
// app.get("/",)
const PORT = process.env.PORT ||5050;


app.use(errorMiddleware);
connectDB().then(
    app.listen(PORT,()=>{console.log(`Server is running at localhost:${PORT}`)})
).catch(()=>console.error("error during connection with mongodb"));