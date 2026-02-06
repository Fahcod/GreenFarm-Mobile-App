import { uploadLocaFiles } from "../utils/fileUploader.js";
import { contentRepository } from "../repositories/contentRepository.js";
import {customError} from "../utils/customError.js"

// THE CONTENT SERVICES

// the create content service
export const createContentService = async ({
    title,
    content_type,
    description,
    user_id,
    content_files
   }) =>{

   //two articles or videos should not have the same title
   let titleCheck = await contentRepository.findOne({title,content_type});
   if(titleCheck){throw new customError("Content already exists with this title",400)};
      
    // Upload the content files
    const {file_urls} = uploadLocaFiles(content_files);
    // create the new content
    let data = await contentRepository.createContent({
        title:title,
        content_type:content_type,
        description:description,
        created_by:user_id,
        files:[...file_urls]
    });

    return {data}
}

// fetch article data service
export const fetchArticleService = async (id)=>{
    // ftech the article
    let data = await contentRepository.findById(id);
    if(!result){throw new customError("Article not found",404)}
    return {data}
}

// fetch all content service
export const fetchAllContentService = async (skip,limit)=>{
   let data = await contentRepository.findAll(skip,limit,{});
   return {data}
}

// delete content service
export const deleteContentService = async (contentId,user_id)=>{
    // fetch the content object, and confirm ownership before deletion
    let contentData = await contentRepository.findById(contentId);
    if(!contentData) throw new customError("Content not found!",404);
    
    if(contentData.created_by.toString() !== user_id){
       throw new customError("You don't own this content please",403)
    }

    //TODO: Add the logic to delete the content files first
    
    // if okay, then delete the content
    let deletedContent = await contentRepository.deleteOne(contentId);
    if(deletedContent.deletedCount === 0){
        throw new customError("Failed to delete the content!",500)
    }
}

// the service to fetch latest content
export const fetchLatestContentService = async (content_type)=>{
    let data = await contentRepository.findLatest(content_type);
    return {data}
}

// the service for fetching all articels or videos depending on request
export const fetchAllSpecificService = async (skip,limit,content_type)=>{
    let data = await contentRepository.findAll(skip,limit,{content_type});
    return {data}
}