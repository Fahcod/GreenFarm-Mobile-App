import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"


const protectRoute = async (req,res,next) =>{
    try {
    // get the token from the headers
    const tokenData = req.headers.authorization;
    if(!tokenData.startsWith('Bearer')){
        return res.status(401).json({message:"Token not found!"})
    }
    // if the tokenData exists, extract the actual access token, the decode it
    const token = tokenData.split(' ')[1];
    const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(!payload.id) return res.status(403).json({message:"Token is expired"});

    // if the token is valid, fetch the user
    const user_id = payload.id;
    let user = await userModel.findById(user_id);
    // if the user does not exist, return an error
    if(!user) return res.status(404).json("User not found!");
    /* if the user exists,set the user_id and the user role in the `req.user` field
     * and then call the next() funcion to call the next middleware or route handler
    */
    req.user={user_id:user._id.toString(),role:user.role};
    next()

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

export {protectRoute}