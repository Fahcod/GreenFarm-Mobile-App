import productModel from "../models/productModel.js";
import storeModel from "../models/storeModel.js";
import { customError } from "../utils/customError.js";
import {uploadLocaFiles} from "../utils/fileUploader.js"

// THE PRODUCT SERVICES

// the service to create the product
export const createProductService = async ({title,description,price,category,
    quantity,storeId,user_id,product_files}) =>{
    
    //two different products should not have the same name
    let productCheck = await productModel.findOne({title:title});
    if(productCheck){ throw new customError(400,"Product with this name already exists")}
    // fetch the store
    let store = await storeModel.findById(storeId);
    if(!store) throw new customError(400,"Store does not exist");
    // then confirm store ownership
    if(store.owner.toString() !== user_id){
        throw new customError(403,"This store is not yours");
    }

    if(product_files.length === 0){
        throw new customError(404,"Product images were not found")
    }
    // if everything is okay, save the product image and create a new product
    // Upload the content files
    const {file_urls} = uploadLocaFiles(product_files);

    let newProduct = new productModel({
      title:title,
      price:price,
      images:[...file_urls],
      description:description,
      category:category,
      store:storeId,
      quantity:quantity
   });
   // save the product
   await newProduct.save();
   let data = await newProduct.populate(
       "store","name store_profile description store_contacts"
    );

    return {data}
}

export const deleteProductService = async ({storeId,productId,user_id}) =>{
    // fetch the product from the database and compare the store id with the one in the request
    // to confirm whether the product belongsto this store in the req.params
    let productData = await productModel.findById(productId).populate("store","owner");
    if(!productData) throw new customError(404,"Product not found!");
    
    //comfirm whether the product belongs to this store with the given storeId
    if(productData.store._id.toString() !== storeId){
        throw new customError(403,"This product does not belong to this store")
    }
    // comfirm whether this user owns the store
    if(productData.store.owner.toString() !== user_id){
        throw new customError(403,"You are not the owner of this product's store")
    }
    //if they own the store, delete the product
    let deletedProduct = await productModel.deleteOne({_id:productId});
    if(deletedProduct.deletedCount === 0){
        throw new customError(500,"Error deleting product")
    }
}