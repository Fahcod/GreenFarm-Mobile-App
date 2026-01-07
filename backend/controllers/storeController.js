import storeModel from "../models/storeModel.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { uploadSaveFile } from "../utils/fileUploader.js";

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
    // check if the store name is not already taken
    let storeCheck = await storeModel.findOne({name:name});
    if(storeCheck){
        return res.status(400).json({message:"This store name is already taken"})
    }
    // create the store
    let newStore = new storeModel({
        owner:user_id,
        name:name,
        dealing_in:dealing_in,
        location:location,
        description:description,
        store_contacts:store_contacts
    });
    await newStore.save();
    let populated_store = await newStore.populate("owner", "profile_pic username")
    //TODO: Add payment logic for the created stores later

    res.status(201).json({message:"Store created successfully",data:populated_store});
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
  
  //check if the file exists in the request
  if(!req.file) return res.status(404).json({message:"File not found"});

 //fetch the store and confirm ownership
 let store = await storeModel.findById(storeId);
 if(!store) return res.status(404).json({message:"Store does not exist"});

 if(store.owner.toString() !== user_id){
    return res.status(400).json({message:"This store is not yours"})
 }
// after confirmation of store ownership, get the image url
const file_url = uploadSaveFile(req.file.filename);
if(!file_url) res.status(500).json({message:"Failed to upload file"});

// update the store in db
store.store_profile = file_url;
await store.save();

res.status(200).json({
    message:"Store profile updated sucessfully",
    new_store_profile:file_url})
});


// delete a store
export const deleteStore = asyncHandler(async (req,res)=>{
  //get the data
  const {user_id} = req.user;
  const {storeId} = req.params;
  if(!storeId) return res.status(404).json({message:"Store id not found"});

 //fetch the store and confirm ownership
 let store = await storeModel.findById(storeId);
 if(!store) return res.status(404).json({message:"Store does not exist"});

 if(store.owner.toString() !== user_id){
    return res.status(400).json({message:"This store is not yours"})
 }
//  after owership confirmation, delete the store
let deletedStore = await storeModel.deleteOne({_id:storeId});
if(!deletedStore.deletedCount > 0){
return res.status(500).json({message:"Error deleting store"})
}
// but if everything goes right, return the response
res.status(200).json({message:"Store deleted successfully"})
});
