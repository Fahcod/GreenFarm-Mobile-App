import storeModel from "../models/storeModel.js"
import { customError } from "../utils/customError.js";
import productModel from "../models/productModel.js";
import { storeRepository } from "../repositories/storeRepository.js";
import { uploadLocaFiles } from "../utils/fileUploader.js";
import {deleteLocalFiles} from "../utils/deleteLocalFiles.js"

// THE STORE SERIVCES

export const createStoreService = async ({name,dealing_in,location,
    description,store_contacts,user_id,plan}) =>{

    // get the current date
    const currentDate = new Date();

    // check if the store name is not already taken
    let storeCheck = await storeRepository.findOne({name:name});
    if(storeCheck) throw new customError("This store name is already taken",400);
    
    // create the store
    const data = await storeRepository.createStore({
        owner:user_id,
        name:name,
        dealing_in:dealing_in,
        location:location,
        description:description,
        store_contacts:store_contacts,
        subscription:{
            plan:plan,
            start_date:currentDate,
            end_date:new Date(currentDate).setMonth(currentDate.getMonth() + 1),
            is_active:true,
        }
    });
   // return the store data after creation
    return {data};
}

export const updateStoreProfileService = async ({user_id,storeId,file}) =>{
    //check if the file exists in the request
    if(!file) throw new customError("File not found",404);
    
     //fetch the store and confirm ownership
     let store = await storeRepository.findById(storeId);
     if(!store) throw new customError("Store does not exist",404);
    
     if(store.owner._id.toString() !== user_id){
        throw new customError("This store is not yours",400)
     }
    // after confirmation of store ownership, get the image url
    const {file_urls} = uploadLocaFiles([file]);
    if(file_urls.length === 0) throw new customError("Failed to upload file",500);

    // delete the old store profile image
    if(store.store_profile){deleteLocalFiles([store.store_profile])}

    // update the store_profile in db
    await storeRepository.updateProfile({_id:store._id,profile_img:file_urls[0]});
    const new_store_profile = file_urls[0];

    return {new_store_profile}
}

export const deleteStoreService = async ({storeId,user_id}) =>{

    //fetch the store and confirm ownership
    let store = await storeModel.findById(storeId);
    if(!store) return res.status(404).json({message:"Store does not exist"});
   
    if(store.owner.toString() !== user_id){
       return res.status(400).json({message:"This store is not yours"})
    }
    // delete all the store products
    let deleteProducts = await productModel.deleteMany({store:storeId});
    if(deleteProducts === 0){
        throw new customError(500,"Failed to delete store products")
    }

    // TODO: Delete the store profile and product images

    // after owership confirmation, delete the store
    let deletedStore = await storeModel.deleteOne({_id:storeId});
    if(deletedStore.deletedCount === 0) throw new customError(500,"Error deleting store");

}

// the service to fetch a single store by id
export const fetchStoreService = async (storeId) =>{
    const store = await storeRepository.findById(storeId);
    if(!store) throw new customError("Store does not exist",404);
    // return the store data
    return {data:store}
}

// the service to fetch all stores
export const fetchAllStoreService = async () =>{
    const data = await storeRepository.findAll();
    return {data}
}