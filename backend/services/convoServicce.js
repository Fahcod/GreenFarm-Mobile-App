import { conversationRepository } from "../repositories/conversationRepository.js";
import {customError} from "../utils/customError.js";

// THE CONVERSTION SERVICE

// the create converstation service
export const createConversationService = async ({user_id,otherId}) =>{
    // first check whether there is a conversation between the two
    const filter = {$or:[
        {created_by:user_id,chatting_with:otherId},
        {created_by:otherId,chatting_with:user_id}
    ]};

    const convoCheck = await conversationRepository.findOne(filter);
    if(convoCheck){throw new customError("Conversation already exists",201)};

    // if the conversation does not exist, create it
    const data = await conversationRepository.createConvo({user_id,otherId});
    return {data}
}