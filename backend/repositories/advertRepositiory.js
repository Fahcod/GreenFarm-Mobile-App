import advertModel from "../models/advertModel.js";

// the repository for adverts
export const advertRepository = {

    findOne: async (filter)=>{
        return advertModel.findOne(filter)
    },

    findById: async (id)=>{
        return advertModel.findById(id);
    },

    createAdvert: async (data)=>{
        const advert = new advertModel(data);
        return advert.save();
    },

    deleteOne: async (id)=>{
        return advertModel.deleteOne({_id:id})
    },

    findMany: async (filter)=>{
        return advertModel.find(filter)
    }
}