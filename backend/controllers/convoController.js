import {asyncHandler} from "../utils/asyncHandler.js";


// the endpoint for creating converstions
export const createConversation = asyncHandler(async (req,res)=>{
    // get the data
    const {user_id} = req.user;
    const {otherId} = req.params;

    

})