import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadLocaFiles} from "../utils/fileUploader.js"

//fetch the user
export const fetchUser = asyncHandler(async (req,res)=>{
    const {user_id} = req.user;
    // fetch the user
    let user = await userModel.findById(user_id).select("-password -refreshToken");
    if(!user) return res.status(404).json({message:"This user does not exist"});
    
    res.status(200).json({data:user})
});

// update the user's name
export const updateUserName = asyncHandler(async (req,res)=>{

  const {user_id} = req.user;
  const {new_name} = req.body;
 
  if(!new_name.trim()){
    return res.status(422).json({message:"Please enter a valid user name"})
  }
  //update the user
  let updatedUser = await userModel.updateOne({_id:user_id},{$set:{name:new_name.trim()}}).exec();
  if(updatedUser.modifiedCount === 0){
    res.status(500).json({message:"Error updating name"})
  }
  res.status(200).json({message:"Name updated successfully",new_name})
});

// fetch weekly new users
export const fetchWeeklyNewUsers = asyncHandler(async (req,res)=>{

  // calculate the start and the end of the week
  const today = new Date();

   // start of Week(Monday)
   const startOfWeek = new Date(today);

   startOfWeek.setHours(0,0,0,0);
   startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
   
   // end of week (Sunday)
   const endOfWeek = new Date(startOfWeek)
   endOfWeek.setDate(endOfWeek.getDate() + 6)
   endOfWeek.setHours(23,59,59,999);

  //  FETCH THE DATA FROM DB
  let result = await userModel.find({
    createdAt:{$gte:startOfWeek,$lte:endOfWeek},
    role:{$ne:"admin"}});
  res.status(200).json({data:result})

});

// update user profile picture
export const updateProfilePic = asyncHandler(async (req,res)=>{
    const {user_id} = req.user;
    // comfirm that the file exists, and fetch the user
    if(!req.file){ return res.status(404).json({message:"File not found"})};
    let user = await userModel.findById(user_id);
    if(!user){ return res.status(404).json({message:"User does not exist"})}
    // TODO: Delete the old profile picture,and upload new one

    const {file_urls} = uploadLocaFiles([req.file]);
    // save the new profile picture
    let updatedCount = await userModel.updateOne({_id:user_id},
      {$set:{profile_pic:file_urls[0]}}).exec();
    
    if(updatedCount.modifiedCount === 0){
      res.status(500).json({message:"Failed to update profile picture"})
    }
    
    res.status(200).json({message:"Profile picture updated"})
})