import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { fetchUser, fetchWeeklyNewUsers, updateProfilePic } from "../controllers/userController.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js";
import {uploader} from "../utils/multer.js"


const userRouter = express.Router();

userRouter.get('/fetch',protectRoute,fetchUser);
userRouter.get('/weekly',protectRoute,restrictTo(["admin"]),fetchWeeklyNewUsers);
userRouter.put('/update-pic',protectRoute,uploader.single("image"),updateProfilePic)

export default userRouter;