import express from "express";
import { validateLoginData, validateSignupData } from "../lib/validation.js";
import { loginUser, logOut, newAccessToken, registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',validateSignupData,registerUser);
authRouter.post('/login',validateLoginData,loginUser);
authRouter.post('/logout',logOut);
authRouter.post('/access-token',newAccessToken)

export default authRouter;