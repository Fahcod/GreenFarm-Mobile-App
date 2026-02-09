import { createAdvertService, deleteAdvertService, 
fetchAdvertService } from "../services/advertService.js";
import {asyncHandler} from "../utils/asyncHandler.js";

// create an advert
export const createAdvert = asyncHandler(async (req,res)=>{
   // check if the file for the advert image exists
   if (!req.file){return res.status(404).json({message:"Image file not found"})};
   const {user_id} = req.user;
   const {title,description,start_date,end_date,target_audience,link} = req.body;

   //TODO: Add the logic to validate the advert data

   //call the create advert service to create the advert in the database
   const {data} = await createAdvertService({
    title,
    description,
    start_date,
    end_date,
    target_audience,
    advert_file:req.file,
    user_id,
    link
   });
   // if the advert is created, return the data
   res.status(201).json({data,message:"Advert created successfully"});
});

// fetch avderts
export const fetchAdverts = asyncHandler(async (req,res)=>{
    const {role} = req.user;
    const target = (role === "farmer"?"farmers":role === "business"?"sellers":"all");
    // fetch the advert data
    const {data} = await fetchAdvertService(target);
    res.status(200).json({data})
});

// delete an advert
export const deleteAdvert = asyncHandler(async (req,res)=>{
    const {advertId} = req.params;
    const {user_id} = req.user;
    if(!advertId){return res.status(404).json({message:"Advert id not found"})};

    // call the delete advert service to delete
    await deleteAdvertService(advertId,user_id);
    res.status(200).json({message:"Advert deleted successfully"})
})