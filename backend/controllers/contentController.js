import { createContentService, deleteContentService, 
fetchAllContentService, fetchAllSpecificService, fetchArticleService, 
fetchLatestContentService} from "../services/contentService.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// create an article or video content
export const createContent = asyncHandler(async (req,res)=>{
    let content_files;
    // get the form data
    const {title,content_type,description} = req.body;
    const {user_id} = req.user;
    if(!req.files) return res.status(404).json({message:"Files not found!"});
    if(content_type === "article"){
        content_files = req.files.images;
    }else if (content_type === "video"){
        content_files = [...req.files.videos,...req.files.images]
    }
    
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
   await deleteContentService(contentId,user_id);

   res.status(200).json({message:"Content deleted successfully"})
});


// fetch all articles
export const fetchAllArticles = asyncHandler(async (req,res)=>{
    const {skip} = req.query;
    const LIMIT = 10;
    // fetch the content of type `article`
    const {data} = await fetchAllSpecificService(skip,LIMIT,"article");
    
    res.status(200).json({data})
});


// fetch latest videos for the homepage
export const fetchLatestVideos = asyncHandler(async (req,res)=>{
    const {data} = await fetchLatestContentService("video");
    // after fetching videos, return them
    res.status(200).json({data})
});

// fetch latest articles for the homepage
export const fetchLatestArticles = asyncHandler(async (req,res)=>{
    const {data} = await fetchLatestContentService("article");
    // after fetching latest articles, return them
    res.status(200).json({data})
});


// fetch all content including videos and articles
export const fetchAllContent = asyncHandler(async (req,res)=>{
     const {skip} = req.query;
     const LIMIT = 10;

     let data = await fetchAllContentService(skip,LIMIT)
     res.status(200).json({data})
});

// fetch the data for a single article
export const fetchArticleData = asyncHandler(async (req,res)=>{
    const {articleId} = req.params;
    if(!articleId || articleId.length === 0){
        res.status(404).json({message:"Article Id not provided"})
    }
    const {data} = await fetchArticleService(articleId)
    res.status(200).json({data});
});

// fetch the data for a single video
export const fetchVideoData = asyncHandler(async (req,res)=>{
    const {videoId} = req.params;
    if(!videoId || videoId.length === 0){
        res.status(404).json({message:"Video id not provided"})
    }
    // ftech the video
    let data = await fetchArticleService(videoId);
    
    res.status(200).json({data});
})