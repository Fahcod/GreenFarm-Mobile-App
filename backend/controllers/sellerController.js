import storeModel from "../models/storeModel.js";
import productModel from "../models/productModel.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import reviewModel from "../models/reviewModel.js";

// THIS CONTROLLER FETCHES SELLER DATA LIKE, total products, total store reviews etc.

// fetch the totals for the seller dashboard
export const fetchSellerTotals = asyncHandler(async (req,res)=>{
     const {user_id} = req.user;
    /* in order to get the total products for all the seller's store, we shall fetch all the
       stores and store their ids in an array and then fetch products from these stores.
    */
    const sellerStoresTotal = await storeModel.countDocuments({owner:user_id});

     res.status(200).json({data:{
        products_total:20,
        stores_total:sellerStoresTotal
    }})
});


// fetch the totals for the store dashboard
export const fetchStoreTotals = asyncHandler(async (req,res)=>{
    // get the store id from the params
    const {storeId} = req.params;

    const reviews_total = await reviewModel.countDocuments({belongs_to:storeId});
    const products_total = await productModel.countDocuments({store:storeId});

    res.status(200).json({data:{reviews_total,products_total}})
})