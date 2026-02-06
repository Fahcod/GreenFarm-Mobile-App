import { customError } from "../utils/customError.js";
import {uploadLocaFiles} from "../utils/fileUploader.js"
import { productRepository } from "../repositories/productRepository.js";
import { storeRepository } from "../repositories/storeRepository.js";

// THE PRODUCT SERVICES

// the service to create the product
export const createProductService = async ({title,description,price,category,
    quantity,storeId,user_id,product_files}) =>{
    
    //two different products should not have the same name
    let productCheck = await productRepository.findOne({title:title});
    if(productCheck){ throw new customError("Product with this name already exists",400)}
    // fetch the store
    let store = await storeRepository.findById(storeId);
    if(!store) throw new customError("Store does not exist",400);
    // then confirm store ownership
    if(store.owner._id.toString() !== user_id){
        throw new customError("This store is not yours",403);
    }

    if(product_files.length === 0){
        throw new customError("Product images were not found",404)
    }
    // if everything is okay, save the product image and create a new product
    // Upload the content files
    const {file_urls} = uploadLocaFiles(product_files);

    let data = await productRepository.createProduct({
      title:title,
      price:price,
      images:[...file_urls],
      description:description,
      category:category,
      store:storeId,
      quantity:quantity
   });

    return {data}
}

export const deleteProductService = async ({storeId,productId,user_id}) =>{
    // fetch the product from the database and compare the store id with the one in the request
    // to confirm whether the product belongsto this store in the req.params
    let productData = await productRepository.findById(productId);
    if(!productData) throw new customError("Product not found!",403);
    
    //comfirm whether the product belongs to this store with the given storeId
    if(productData.store._id.toString() !== storeId){
        throw new customError("This product does not belong to this store",403)
    }
    // comfirm whether this user owns the store
    if(productData.store.owner.toString() !== user_id){
        throw new customError("You are not the owner of this product's store",403)
    }

    // TODO: Add the logic to delete product files first

    //if they own the store, delete the product
    let deletedProduct = await productRepository.deleteOne(productId);
    if(deletedProduct.deletedCount === 0){
        throw new customError("Error deleting product",500)
    }
}