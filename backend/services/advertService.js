import { advertRepository } from "../repositories/advertRepositiory.js";
import {customError} from "../utils/customError.js";
import {uploadLocaFiles} from "../utils/fileUploader.js";
import {deleteLocalFiles} from "../utils/deleteLocalFiles.js"

// THE ADVERT SERVICES

// the service to create adverts
export const createAdvertService = async ({title,description,start_date,end_date,
    target_audience,advert_file,user_id,link})=> {
    // upload the ad image first
    if(!advert_file){throw new customError("Advert image file not found",404)};
    const {file_urls} = uploadLocaFiles([advert_file]);
    
    // create the new advert in the database
    const data = await advertRepository.createAdvert({
        title,
        created_by:user_id,
        description,
        start_date,
        end_date,
        image:file_urls[0],
        target_audience,
        link
    });

    return {data}
}

// the service to delete adverts
export const deleteAdvertService = async (advertId,user_id)=>{
   if(!advertId){throw new customError("Advert id not provided",404)};
   const advert = await advertRepository.findById(advertId);
   if(!advert){throw new customError("Advert does not exist",404)};

   //check if the user owns the advert
   if(advert.created_by.toString() !== user_id){
    throw new customError("Sorry, you don't own this advert",403)
   }

   const filename = advert.image;
   // delete the advert image file first
   deleteLocalFiles([filename]);

   //call the repository to delete the advert form the database
   const result = await advertRepository.deleteOne(advertId);
   if(result.deletedCount === 0){
    throw new customError("Failed to delete the advert",500);
   }
}

// the service to fetch the ads
export const fetchAdvertService = async (target_audience) =>{
    // fetch the adverts basing on the user role
    const filter = {$or:[{target_audience:"all"},{target_audience:target_audience}]};
    const data = await advertRepository.findMany(filter);

    return {data}
}