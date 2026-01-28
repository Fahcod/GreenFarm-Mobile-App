import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { fetchUser, fetchWeeklyNewUsers } from "../controllers/userController.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"


const userRouter = express.Router();

userRouter.get('/fetch',protectRoute,fetchUser);
userRouter.get('/weekly',protectRoute,restrictTo(["admin"]),fetchWeeklyNewUsers);

export default userRouter;