import contentModel from "../models/contentModel.js";
import { createContentService } from "../services/contentService.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// create an article or video content
export const createContent = asyncHandler(async (req,res)=>{
    // get the form data
    const {title,content_type,description} = req.body;
    const {user_id} = req.user;
    if(!req.files) return res.status(404).json({message:"File not found!"});
    const content_files = req.files;
    
    // validate the data
    if(title.trim().length === 0 || description.trim().length === 0){
        return res.status(422).json({message:"Either title or descriptions is empty!"})
    }
    // make sure that the data is of normal length
    const contentData = {title,description}
    switch(contentData){
     
    case contentData.title.length > 10:
        return res.status(422).json({message:"The title is too short"});
    
    case contentData.title.length > 90:
        return res.status(422).json({message:"The title is too long"});

    case contentData.description.length < 10:
        return res.status(422).json({message:"The description is too short"});
    
    case contentData.description.length > 1000:
        return res.status(422).json({message:"The description is too long"});
}
// call the create content service
const {data} = await createContentService({
    title,
    content_type,
    description,
    user_id,
    content_files
});

res.status(201).json({data:data,message:"Created successfully"});

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


// fetch latest videos for the homepage
export const fetchLatestVideos = asyncHandler(async (req,res)=>{

    let result = await contentModel.find({content_type:"video"})
    .populate("created_by","name profile_pic").sort({createdAt:-1})
    .limit(5);

    // after fetching the five latest videos, return them
    res.status(200).json({data:result})
});

// fetch latest articles for the homepage
export const fetchLatestArticles = asyncHandler(async (req,res)=>{

    let result = await contentModel.find({content_type:"video"})
    .populate("created_by","name profile_pic").sort({createdAt:-1})
    .limit(5);

    // after fetching the five latest videos, return them
    res.status(200).json({data:result})
});


// fetch all content including videos and articles
export const fetchAllContent = asyncHandler(async (req,res)=>{
     const {skip} = req.query;
     const LIMIT = 10;

     let results = await contentModel.find({}).skip(skip).limit(LIMIT)
     .populate("created_by","name profile_pic");

     res.status(200).json({data:results})
})
