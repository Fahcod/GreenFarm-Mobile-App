import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import {connectDB} from "./config/db.js"
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoute.js";
import storeRouter from "./routes/storeRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import questionRouter from "./routes/questionRoute.js";
import answerRouter from "./routes/answerRoute.js";

// load the env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.json());
app.use(cors());
app.use(helmet());

// rate limiting to prevent our API from bute-force attacks
app.use(rateLimit({
    windowMs:1000 * 60 * 15,
    message:'Too many requests frim this ip, try again later',
    max:100,
    handler:(req,res)=>{res.status(429)
    .json({message:"Too many requests, try again later"})}
}));

// logging for better debugging, and then the global error handler
app.use(morgan("dev"));
app.use(errorHandler)

// mount the API routers
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/store',storeRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/content',contentRouter);
app.use('/api/v1/review',reviewRouter);
app.use('/api/v1/question',questionRouter);
app.use('/api/v1/answer',answerRouter)

//connect to the databse and run the server
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`The server started on port: ${PORT}`)
})
});
