import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { excludeFileds } from "../utils/fieldExcluder.js";


//fetch the user
const fetchUser = asyncHandler(async (req,res)=>{
    // get the user id from the body
    const {user_id} = req.user;
    // fetch the user
    let user = await userModel.findById(user_id);
    if(!user) return res.status(404).json({message:"This user does not exist"});
    
    let user_data = excludeFileds(user,["password,refreshToken"]);
    res.status(200).json({data:user_data})
});

// update the user's name
const updateUserName = asyncHandler(async (req,res)=>{
  // get the user id and the new name
  const {user_id} = req.user;
  const {new_name} = req.body;
  //validate the name
  if(!new_name.trim()){
    return res.status(422).json({message:"Please enter a valid user name"})
  }
  //update the user
  let updatedUser = await userModel.updateOne({_id:user_id},{$set:{name:new_name.trim()}}).exec();
  if(updatedUser.modifiedCount === 0){
    res.status(500).json({message:"Error updating name"})
  }
  // else if the user name is updated, return the response
  res.status(200).json({message:"Name updated successfully",new_name})

});


export {fetchUser,updateUserName}