import productModel from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { createProductService, deleteProductService } from "../services/productService.js";

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
    // call the create product service
    const {data} = await createProductService({title,description,price,category,
    quantity,user_id,storeId})
    // return the response
    res.status(201).json({message:"Product addded successfully",data})
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

// call the delete product service
await deleteProductService({storeId,productId,user_id});

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

// get the suggested products
export const fetchSuggestedProducts = asyncHandler(async (req,res)=>{
    
    let result = await productModel.find()
    .populate("store","name store_profile description store_contacts")
    .limit(5);

    res.status(200).json({data:result})
})