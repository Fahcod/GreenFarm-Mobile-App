import userModel from "../models/userModel.js";
import { customError } from "../utils/customError.js";
import { createAccessToken,createRefreshToken } from "../utils/tokenUtils.js";
import bcrypt from "bcryptjs";

// THE AUTH SERVICE
export const registerUserService = async ({name,email,role,password}) =>{

    // check if this email already exists in db
    let emailCheck = await userModel.findOne({email:email});
    if(emailCheck){
        throw new customError("This email is already taken",400)
    }
    // else, hash the password and create a new user, and save
    const salt = await bcrypt.genSalt(10);
    const hashed_pwd = await bcrypt.hash(password,salt);

    // create a new user
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

    const data = user;
    // return the data
    return {refresh_token,data,access_token}
}

export const loginUserService = async ({email,password}) =>{
    // fetch the user by email
    let user = await userModel.findOne({email:email});
    if(!user) throw new customError("User does not exist",404);

    // if the user exists then compare the passwords
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new customError("Wrong password",400);
    
    // the generate the tokens
    let refresh_token = createRefreshToken(user._id);
    let access_token = createAccessToken(user._id);
    // update the user and store the access token
    user.refreshToken = refresh_token;
    await user.save();

    const data = user;

    return {refresh_token,data,access_token}
}

export const newTokenService = async ({refresh_token}) =>{
 // find the user with that token
 let user = await userModel.findOne({refreshToken:refresh_token});
 if(!user) throw new customError("Invalid refresh token",404);

 // if the token is valid and user exists, decode the token
 let payload = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET);
 if(!payload.id) customError(403,"Token was expired");
 // get the user_id from the payload and create a new access token
 const user_id = payload.id;

 // the generate the tokens
 let new_refresh_token = createRefreshToken(user_id);
 let new_access_token = createAccessToken(user_id);
 // update the user and store the refresh token
 user.refreshToken = new_refresh_token;
 await user.save();

 return {new_refresh_token,new_access_token};

}