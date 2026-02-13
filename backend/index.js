import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js"
import authRouter from "./routes/authRoute.js";
import storeRouter from "./routes/storeRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import questionRouter from "./routes/questionRoute.js";
import answerRouter from "./routes/answerRoute.js";
import adminRouter from "./routes/adminRoute.js";
import advertRouter from "./routes/advertRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import { allowedOrigins } from "./lib/allowedOrigins.js";

// load the env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7500;

app.use(express.json());
app.use(cors({
    credentials:true,
    methods:["POST","PUT","DELETE","GET"],
    origin:allowedOrigins,
}));
app.use(helmet());
app.use(cookieParser())

// rate limiting to prevent our API from bute-force attacks
app.use(rateLimit({
    windowMs:1000 * 60 * 15,
    message:'Too many requests frim this ip, try again later',
    max:1600,
    handler:(req,res)=>{res.status(429)
    .json({message:"Too many requests, try again later"})}
}));

// logging for better debugging, and then the global error handler
app.use(morgan("dev"));

app.get('/',(req,res)=>{
    res.status(200).json({message:"Server is running"})
})

// mount the API routers
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/store',storeRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/content',contentRouter);
app.use('/api/v1/review',reviewRouter);
app.use('/api/v1/question',questionRouter);
app.use('/api/v1/answer',answerRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/advert',advertRouter);
app.use('/api/v1/seller',sellerRouter)
app.use('/api/v1/assets',express.static("uploads"));

// the global error handler
app.use((err,req,res,next)=>{
  console.log(err.stack)
  if(err.isOperational){
     res.status(err.statusCode || 500).json({
        message:err.message || "Internal Server Error"
    });
  }else{
     res.status(500).json({message:"Internal Server Error"});
  }
})

//connect to the databse and run the server
connectDB().then(()=>{
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`The server started on port: ${PORT}`)
})
});