import storeModel from "../models/storeModel.js"
import { customError } from "../utils/customError.js";
import productModel from "../models/productModel.js";

// THE STORE SERIVCES

export const createStoreService = async ({name,dealing_in,location,
    description,store_contacts,user_id}) =>{

    // get the current date
    const currentDate = new Date();

    // check if the store name is not already taken
    let storeCheck = await storeModel.findOne({name:name});
    if(storeCheck) throw new customError("This store name is already taken",400);
    
    // create the store
    let newStore = new storeModel({
        owner:user_id,
        name:name,
        dealing_in:dealing_in,
        location:location,
        description:description,
        store_contacts:store_contacts,
        subscription:{
            plan:"free",
            start_date:currentDate,
            end_date:new Date(currentDate).setMonth(currentDate.getMonth() + 1),
            is_active:true,
        }
    });

    await newStore.save();
    let data = await newStore.populate("owner", "profile_pic username")
    //TODO: Add payment logic for the created stores later

    return {data};
}

export const updateStoreProfileService = async ({user_id,storeId}) =>{
    //check if the file exists in the request
    if(!req.file) throw new customError(404,"File not found");
    
     //fetch the store and confirm ownership
     let store = await storeModel.findById(storeId);
     if(!store) throw new customError(404,"Store does not exist");
    
     if(store.owner.toString() !== user_id){
        throw new customError(400,"This store is not yours")
     }
    // after confirmation of store ownership, get the image url
    const file_url = 'http://';
    if(!file_url) throw new customError("Failed to upload file",500);
    
    // update the store in db
    store.store_profile = file_url;
    await store.save();

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