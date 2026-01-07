import productModel from "../models/productModel.js";
import storeModel from "../models/storeModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { uploadSaveFile } from "../utils/fileUploader.js";

// create a new product
export const createNewProduct = asyncHandler(async (req,res)=>{
    // get the product data and validate it
    const {title,description,price,category,quantity} = req.body;
    const {user_id} = req.user;
    const {storeId} = req.params;

    // check if the the store id exists in the parameters
    if(!storeId) return res.status(404).json({message:"Store id was not found!"})

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:"Please fill in all the fields correctly",
            errors:errors.mapped()
        })
    }
    //two different products should not have the same name
    let productCheck = await productModel.findOne({title:title});
    if(productCheck){ return res.status(400).json({
        message:"Product with this name already exists"
    })}
    // fetch the store
    let store = await storeModel.findById(storeId);
    if(!store) return res.status(404).json({message:"Store not found!"});
    // then confirm store ownership
    if(store.owner.toString() !== user_id){
        return res.status(403).json({message:"This store is not yours"})
    }
    // if everything is okay, save the product image and create a new product
    const file_url ="https://" //uploadSaveFile(req.file.filename);
    
    let newProduct = new productModel({
        title:title,
        price:price,
        images:[file_url],
        description:description,
        category:category,
        store:storeId,
        quantity:quantity
    });
    // save the product
    await newProduct.save();
    let populatedProduct = await newProduct.populate(
        "store","name store_profile description store_contacts"
    );
    // return the response
    res.status(201).json({message:"Product addded successfully",data:populatedProduct})
});


//fetch all products, with cursor-based pagination pagination
export const fetchProducts = asyncHandler(async (req,res)=>{
   const {after} = req.query;
   const LIMIT = 10;
  // the empty query object to use
   let query={}
  //if the after exists, fetch the products that have an id is greater than the last
  //product id
  if(after){query._id = {$gt:after}}
   
  let result = await productModel.find(query).sort({_id:1})
  .limit(LIMIT).populate("store","name store_profile description store_contacts");

   res.status(200).json({data:result})
});


//delete a product
export const deleteProduct = asyncHandler(async (req,res)=>{
//get the data like, storeId,productId and user id
const {storeId,productId} = req.params;
const {user_id} = req.user;
// make sure the product id and are available and not undefined
if (!storeId || !productId){
    return res.status(404).json({message:"Product id and Store id are required"})
}
// fetch the product from the database and compare the store id with the one in the request
// to confirm whether the product belongsto this store in the req.params
let productData = await productModel.findById(productId).populate("store","owner");
if(!productData) return res.status(404).json({message:"Product not found!"});

//comfirm whether the product belongs to this store with the given storeId
if(productData.store._id.toString() !== storeId){
    return res.status(403).json({message:"This product does not belong to this store"})
}

// comfirm whether this user owns the store
if(productData.store.owner.toString() !== user_id){
    return res.status(403).json({message:"You are not the owner of this product's store"})
}
//if they own the store, delete the product
let deletedProduct = await productModel.deleteOne({_id:productId});
if(!deletedProduct.deletedCount > 0){
    res.staus(500).json({message:"Error deleting product"})
}

res.status(200).json({message:"Product deleted successfully"})
});


//get store products
export const fetchStorePoducts = asyncHandler(async (req,res)=>{
// we shall fetch the products but with cursor-based pagination
const {storeId,after} = req.query;
const LIMIT = 10;

if(!storeId) return res.status(404).json({message:"The store id was not found"})
// the query object
let query = {store:storeId}
/* if the 'after' exists, then filter and return the documents with an id greater
than the 'after' id*/
if (after) {query._id = {$gt:after} }
let results = await productModel.find(query).sort({_id:1})
.limit(LIMIT).populate("store","name store_profile description store_contacts");

res.status(200).json({data:results})
});
