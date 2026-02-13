import contentModel from "../models/contentModel.js";


// the repository to work with content
export const contentRepository = {

    findById: async (id)=>{
        return contentModel.findById(id)
         .populate("created_by","name profile_pic")
    },

    findOne: async (filter)=>{
        return contentModel.findOne(filter)
        .populate("created_by","name profile_pic")
    },

    createContent: async (data)=>{
        const content = new contentModel(data);
        await content.save();
        return content.populate("created_by","name profile_pic")
    },

    findAll:async (skip,limit,filter) =>{
        return contentModel.find(filter).skip(skip)
        .limit(limit).populate("created_by","name profile_pic")
    },

    deleteOne: async (id) =>{
        return contentModel.deleteOne({_id:id})
    },

    findLatest: async (content_type) =>{
        return contentModel.find({content_type})
        .populate("created_by","name profile_pic").sort({createdAt:-1})
        .limit(6)
    }
}