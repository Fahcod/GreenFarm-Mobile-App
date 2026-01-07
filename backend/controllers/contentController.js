import contentModel from "../models/contentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";


// create an article or video content
export const createContent = asyncHandler(async (req,res)=>{
// get the form data
const {title,content_type,description} = req.body;
const {user_id} = req.user;
// check if the file exists in the req
// if(!req.file) return res.status(404).json({message:"File not found!"})

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({
        message:"Please fill in all the fields correctly",
        errors:errors.mapped()
    })
}
// TODO: Add file upload logic
  
// create the new content
let newContent = new contentModel({
    title:title,
    content_type:content_type,
    description:description,
    created_by:user_id,
    files:['http://']
});
await newContent.save();
let populatedContent = await newContent.populate("created_by","name profile_pic");
res.status(201).json({data:populatedContent});

});

//delete content either ( article or video )
export const deleteContent = asyncHandler(async (req,res)=>{
//get the data
const {user_id} = req.user;
const {contentId} = req.params;
// check if the content id exists
if(!contentId) return res.status(404).json({message:"Content id not found!"});
// fetch the content object, and confirm ownership before deletion
let contentData = await contentModel.findById(contentId);
if(!contentData) return res.status(404).json({message:"Content not found!"});

if(contentData.created_by.toString() !== user_id){
return res.status(403).json({message:"You don't own this content please"})
}
//TODO: Add the logic to delete the content files first

// if okay, then delete the content
let deletedContent = await contentModel.deleteOne({_id:contentId});
if(!deletedContent.deletedCount > 0){
    return res.status(500).json({message:"Failed to delete the content!"})
}
res.status(200).json({message:"Content deleted successfully"})
});


// fetch all articles
export const fetchAllArticles = asyncHandler(async (req,res)=>{
    const {skip} = req.query;
    const LIMIT = 10;

    let query ={content_type:"article"};
    // add pagination in order to allow the data to be fetched in small chuncks
    let result = await contentModel.find(query).skip(skip).limit(LIMIT).sort({_id:1});
    
    res.status(200).json({data:result})
});

// fetch latest videos
export const fetchLatestVideos = asyncHandler(async (req,res)=>{
    const {skip} = req.query;
    const LIMIT = 10;

    let query ={content_type:"video"};
    // add pagination in order to allow the data to be fetched in small chuncks
    let result = await contentModel.find(query).skip(skip).limit(LIMIT).sort({_id:-1});
    
    res.status(200).json({data:result})
});
