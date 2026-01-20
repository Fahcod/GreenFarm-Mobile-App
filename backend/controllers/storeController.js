import storeModel from "../models/storeModel.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { createStoreService, deleteStoreService, updateStoreProfileService } from "../services/storeService.js";

// create a store
export const createStore = asyncHandler(async (req,res)=>{
    // get the form data
    const {name,dealing_in,location,description,store_contacts} = req.body;
    const {user_id} = req.user;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message:"Please fill in the fields correctly",
            errors:errors.mapped()})
    }
    
    // call the create store service to create the store
    const {data} = await createStoreService({name,dealing_in,location,
        description,store_contacts,user_id})

    res.status(201).json({message:"Store created successfully",data});
});

//fetch store details
export const fetchStore = asyncHandler(async (req,res)=>{
    // get the store id
    const {storeId} = req.params;
    if(!storeId) return res.status(404).json({message:"Store id not found"})
    let result = await storeModel.findById(storeId).populate("owner","profile_pic");
    if(!result){
        return res.status(404).json({message:"Store does not exist"})
    }
    // else if the store exists, return the data
    res.status(200).json({data:result})
});

// update the store profile or the store logo
export const updateStoreProfile = asyncHandler(async (req,res)=>{
  //get the data
  const {user_id} = req.user;
  const {storeId} = req.params;
  if(!storeId) return res.status(404).json({message:"Store id not found"});
  //call the update the store profile service 
  const {new_store_profile} = await updateStoreProfileService({
    new_store_profile,
    storeId,
    user_id
   });

  res.status(200).json({message:"Store profile updated sucessfully",new_store_profile})
});


// delete a store
export const deleteStore = asyncHandler(async (req,res)=>{
  //get the data
  const {user_id} = req.user;
  const {storeId} = req.params;
  if(!storeId) return res.status(404).json({message:"Store id not found"});
  
  // call the delete store service to delete the store together with all its products
  await deleteStoreService({user_id,storeId});

// but if everything goes right, return the response
res.status(200).json({message:"Store deleted successfully"})
});
