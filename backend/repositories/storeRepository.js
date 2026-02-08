import storeModel from "../models/storeModel.js";


// the store repository
export const storeRepository = {

    findById: async (id) =>{
        return storeModel.findById(id)
        .populate("owner","name profile_pic")
    },

    createStore: async (data) =>{
        const store = new storeModel(data);
        await store.save();
        return store.populate("owner","name profile_pic");
    },

    findOne:async (filter)=>{
        return storeModel.findOne(filter)
        .populate("owner","name profile_pic");
    },

    updateProfile: async (data)=>{
        return storeModel.updateOne({_id:data._id},
            {$set:{store_profile:data.profile_img}})
    },

    findAll: async ()=>{
        return storeModel.find({})
        .populate("owner","name profile_pic");
    },

    findLatest:async (limit)=>{
        
    }
}