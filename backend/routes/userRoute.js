import express from "express";
import { validateNewName } from "../lib/validation.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { fetchUser, updateUserName } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.put('/new-name',protectRoute,validateNewName,updateUserName);
userRouter.get('/fetch',protectRoute,fetchUser)

export default userRouter;