import userModel from "../models/userModel.js";
import storeModel from "../models/storeModel.js";
import contentModel from "../models/contentModel.js";
import productModel from "../models/productModel.js";
import {asyncHandler} from "../utils/asyncHandler.js"

// the endpoint for getting the KPI card totals
export const getAdminTotals = asyncHandler(async (req,res)=>{
     
    // count the documents and return the totals
    const total_farmers = await userModel.countDocuments({role:"farmer"});
    const total_businesses = await userModel.countDocuments({role:"business"});
    const total_stores = await storeModel.countDocuments();
    const total_products = await productModel.countDocuments();
    const total_videos = await contentModel.countDocuments({content_type:"video"});
    const total_articles = await contentModel.countDocuments({content_type:"article"})

    const data = {
        total_farmers,
        total_businesses,
        total_stores,
        total_products,
        total_videos,
        total_articles
    };

    // return the data to the admin
    res.status(200).json({data});
});