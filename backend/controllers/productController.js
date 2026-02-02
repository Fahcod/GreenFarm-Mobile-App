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

    // check if the files exist
    if (!req.files) return res.status(404).json({message:"Files not found"})
    const product_files = req.files

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
    quantity,user_id,storeId,product_files})
    // return the response
    res.status(201).json({message:"Product addded successfully",data})
});


//fetch all products, with cursor-based pagination pagination
export const fetchProducts = asyncHandler(async (req,res)=>{
    const {skip,limit} = req.query;

    // fetch the products
    let result = await productModel.find()
    .populate("store","name store_profile description store_contacts")
    .skip(skip).limit(limit);

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
     // we shall fetch the products but with pagination
     const {storeId,skip,limit} = req.query;
     
     if(!storeId) return res.status(404).json({message:"The store id was not found"})
    
     let results = await productModel.find({store:storeId}).sort({_id:1})
    .skip(skip).limit(limit)
    .populate("store","name location store_profile description store_contacts");
     res.status(200).json({data:results})
});

// get the suggested products
export const fetchSuggestedProducts = asyncHandler(async (req,res)=>{
    
    let result = await productModel.find()
    .populate("store","name store_profile description store_contacts")
    .limit(5);

    // TODO: Add the logic to get the products with higher rating

    res.status(200).json({data:result})
});


// get single product details
export const fetchProduct = asyncHandler(async (req,res)=>{
    const {productId} = req.params;
    // check if the product id exists
    if(!productId){
        return res.status(404).json({message:"Product id not found"})
    }
    // fetch the product
    let result = await productModel.findById(productId).
    populate("store","name store_profile location description store_contacts dealing_in");

    if(!result){return res.status(404).json({message:"Product not found"})}
    res.status(200).json({data:result});
});


// fetch products of a specific category
export const fetchByCategory = asyncHandler(async (req,res)=>{
    const {skip,limit} = req.query;
    const {category} = req.params;

    if(!category){return res.status(404).json({message:"Category not found"})};

    // fetch the products
    let result = await productModel.find({category:category})
    .populate("store","name store_profile description store_contacts")
    .skip(skip).limit(limit);

    res.status(200).json({data:result})
})