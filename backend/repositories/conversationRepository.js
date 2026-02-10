import conversationModel from "../models/conversationModel.js";


// the converstion repository
export const conversationRepository = {

    findOne: async (filter)=>{
        return conversationModel.findOne(filter)
    },

    createConvo: async (data)=>{
        const conversation = new conversationModel(data);
        await conversation.save();
        return conversation.populate("chatting_with","profile_pic name")
    },

    findMany: async (filter)=>{
        return conversationModel.find(filter)
    }
}