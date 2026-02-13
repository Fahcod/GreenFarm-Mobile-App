import storeModel from "../models/storeModel.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { createStoreService, deleteStoreService,
     fetchAllStoreService,
     fetchStoreService,
     updateStoreProfileService } from "../services/storeService.js";

// create a store
export const createStore = asyncHandler(async (req,res)=>{
    // get the form data
    const {name,dealing_in,location,description,store_contacts,plan} = req.body;
    const {user_id} = req.user;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).json({message:"Please fill in the fields correctly",
            errors:errors.array()})
    }
    
    // call the create store service to create the store
    const {data} = await createStoreService({name,dealing_in,location,
        description,store_contacts,user_id,plan})

    res.status(201).json({message:"Store created successfully",data});
});

//fetch store details
export const fetchStore = asyncHandler(async (req,res)=>{
    // get the store id
    const {storeId} = req.params;
    if(!storeId) return res.status(404).json({message:"Store id not found"})
    const {data} = await fetchStoreService(storeId);
    // else if the store exists, return the data
    res.status(200).json({data})
});

// update the store profile or the store logo
export const updateStoreProfile = asyncHandler(async (req,res)=>{
  //get the data
  const {user_id} = req.user;
  const {storeId} = req.params;
  if(!storeId) return res.status(404).json({message:"Store id not found"});
  if(!req.file) return res.status(404).json({message:"File not found"})
  //call the update the store profile service 
  const {new_store_profile} = await updateStoreProfileService({
    file:req.file,
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


// fetch all stores
export const fetchAllStores = asyncHandler(async (req,res)=>{
    const {data} = await fetchAllStoreService();
    res.status(200).json({data})
});

// fetch the newly created stores
export const fetchLatestStores = asyncHandler(async (req,res)=>{

   //fetch and return the 5 latest stores
   let results = await storeModel.find({}).limit(5).sort({createdAt:-1})
   .populate("owner","name profile_pic email");

   res.status(200).json({data:results});
});

// fetch business's stores
export const fetchBusinessStores = asyncHandler(async (req,res)=>{
    // get the id of the business owner
    const {user_id} = req.user;

    let results = await storeModel.find({owner:user_id}).limit(3)
    .sort({createdAt:-1});
    res.status(200).json({data:results})
})