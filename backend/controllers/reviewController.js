import { asyncHandler } from "../utils/asyncHandler.js";
import reviewModel from "../models/reviewModel.js";


// the endpoint for adding a review
export const addReview = asyncHandler(async (req,res)=>{
    // get the data
    const {user_id} = req.user;
    const {message} = req.body;
    const {belongsTo} = req.params;
    // belongsTo is the id of the store or product to which this review belongs
    if(!belongsTo) return res.status(404).json({message:"`BelongsTo` was not found"});

    // validate the message
    if(!message.trim()){
        return res.status(422).json({message:"Please message can't be empty"})
    }else if (message.length > 255){
        return res.status(422).json({message:"Please message is too long"})
    }
    // create the new review
    let newReview = new reviewModel({
       message:message,
       belongs_to:belongsTo,
       created_by:user_id,
    });
    // save the new review
    await newReview.save();
    let populatedReview = await newReview.populate("created_by","name profile_pic")
    
    res.status(201).json({data:populatedReview})
});

// the endpoint for deleting a review
export const deleteReview = asyncHandler(async (req,res)=>{
    const {reviewId} = req.params;
    const {user_id} = req.user;

    // check review id existance
    if(!reviewId) return res.status(404).json({message:"Review id not found"});
    let reviewData = await reviewModel.findById(reviewId);
    
    if(!reviewData){
        return res.status(404).json({message:"Review does not exist"})
    }
    //make sure the user owns this review
    if(reviewData.created_by.toString() !== user_id){
        return res.status(403).json({message:"Sorry, this review isn't yours"})
    }
    //if all things are okay, delete and also confirm deletion
    let deletedReview = await reviewModel.deleteOne({_id:reviewId});
    if(!deletedReview.deletedCount > 0){
        return res.status(500).json({message:"Failed to delete review"})
    }
});


// the endpoint for fetching reviews for a store or product
export const fetchReviews = asyncHandler( async (req,res)=>{
    const {belongsTo,skip} = req.query;
    // belongsTo represents the store or productid
    const LIMIT = 25;

    if(!belongsTo) return res.status(404).json({message:'`BelongsTo` was not found'});
    let result = await reviewModel.find({belongs_to:belongsTo})
    .populate("created_by","name profile_pic").skip(skip).limit(LIMIT)

    res.status(200).json({data:result})
});
