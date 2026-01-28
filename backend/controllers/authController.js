import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { loginUserService,
 registerUserService } from "../services/authService.js";


// The user register endpoint
export const registerUser = asyncHandler(async (req,res)=>{
    // get the form data and validate it to ensure that there are no errors
    const {name,email,role,password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:"Please fill in all the fields correctly",
            errors:errors.array()
        })
    }
    // call the register user service to create the user
    const {refresh_token,data,access_token} = await registerUserService({
        name,email,role,password
    });

     //set the cookie in the response
    res.cookie('auth',refresh_token,
    {httpOnly:true,secure:true,sameSite:'none',maxAge: 1000 * 60 * 60 * 24 *30});

    // return the response to the user
    res.status(201).json({refresh_token,data,access_token});
});


// the user login endpoint
export const loginUser = asyncHandler(async (req,res)=>{
    // get the form data and validate it to ensure that there are no errors
    const {email,password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:"Please fill in all the fields correctly",
            errors:errors.mapped()
        })
    }
    // call the login service to login the user
    const {refresh_token,data,access_token} = await loginUserService({email,password});

    //set the cookie in the response
    res.cookie('auth',refresh_token,
    {httpOnly:true,secure:true,sameSite:'none',maxAge: 1000 * 60 * 60 * 24 *30});
    
    // return the response to the user
    res.status(201).json({refresh_token,data,access_token});
});


// the logOut endpoint
export const logOut = asyncHandler(async(req,res)=>{
  //get the token
  const {token} = req.body;
  if(!token) return res.status(400).json({message:"No token was found!"});
  //find the user
  let user = await userModel.findOne({refreshToken:token});
  if(!user) return res.status(404).json({message:"The token seems to be invalid!"});
  //delete the refresh token from the db
  user.refreshToken = null;
  await user.save()

  res.status(200).json({message:"Logged out!"})
});


// the password reset endpoint
export const resetPassword = asyncHandler(async (req,res)=>{
    // TODO: Add the password reset logic
});
