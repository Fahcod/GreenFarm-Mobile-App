import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createAccessToken,createRefreshToken } from "../utils/tokenUtils.js";
import { validationResult } from "express-validator";
import { excludeFileds } from "../utils/fieldExcluder.js";
import jwt from "jsonwebtoken"


// The user register endpoint
export const registerUser = asyncHandler(async (req,res)=>{
    // get the form data and validate it to ensure that there are no errors
    const {name,email,role,password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:"Please fill in all the fields correctly",
            errors:errors.mapped()
        })
    }
    // check if this email already exists in db
    let emailCheck = await userModel.findOne({email:email});
    if(emailCheck){
        return res.status(400).json({message:"This email already exists"})
    }
    // else, hash the password and create a new user, and save
    const salt = await bcrypt.genSalt(10);
    const hashed_pwd = await bcrypt.hash(password,salt);

    let newUser = new userModel({
        name:name,
        role:role,
        password:hashed_pwd,
        email:email
    });

    let user = await newUser.save();
    // the generate the tokens
    let refresh_token = createRefreshToken(user._id);
    let access_token = createAccessToken(user._id);

    // update the user and store the access token
    user.refreshToken = refresh_token;
    await user.save();
    let user_data = excludeFileds(user,["password","refresh_tokens"]);
    // return the response to the user
    res.status(201).json({refresh_token,data:user_data,access_token});

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
    // fetch the user by email
    let user = await userModel.findOne({email:email});
    if(!user) return res.status(404).json({message:"This user does not exist"});

    // if the user exists then compare the passwords
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({message:"You entered a wrong password"});
    
    // the generate the tokens
    let refresh_token = createRefreshToken(user._id);
    let access_token = createAccessToken(user._id);
    // update the user and store the access token
    user.refreshToken = refresh_token;
    await user.save();

    let user_data = excludeFileds(user,["password","refreshToken"]);
    // return the response to the user
    res.status(201).json({refresh_token,user_data,access_token});

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

// endpoint for a new access token
export const newAccessToken = asyncHandler(async(req,res)=>{
    // get the token
    const {refresh_token} = req.body;
    if(!refresh_token){
        return res.status(404).json({message:"Access token not found!"})
    }
    // find the user with that token
    let user = await userModel.findOne({refreshToken:refresh_token});
    if(!user) return res.status(404).json({message:"Invalid access token"});
    // if the token is valid and user exists, decode the token
    let payload = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET);
    if(!payload.id) res.status(403).json({message:"Token was expired"});
    // get the user_id from the payload and create a new access token
    const user_id = payload.id;
    // the generate the tokens
    let new_refresh_token = createRefreshToken(user_id);
    let new_access_token = createAccessToken(user_id);
    // update the user and store the access token
    user.refreshToken = new_refresh_token;
    await user.save();

    res.status(200).json({new_refresh_token,new_access_token})
});

// the password reset endpoint
export const resetPassword = asyncHandler(async (req,res)=>{
    // TODO: Add the password reset logic
});
