import { uploadLocaFiles } from "../utils/fileUploader.js";
import contentModel from "../models/contentModel.js";

// THE CONTENT SERVICES

// the create content service
export const createContentService = async ({
    title,
    content_type,
    description,
    user_id,
    content_files
}) =>{
      
    // Upload the content files
    const {file_urls} = uploadLocaFiles(content_files);
      
    // create the new content
    let newContent = new contentModel({
        title:title,
        content_type:content_type,
        description:description,
        created_by:user_id,
        files:[...file_urls]
    });
    await newContent.save();
    let data = await newContent.populate("created_by","name profile_pic");

    return {data}
}