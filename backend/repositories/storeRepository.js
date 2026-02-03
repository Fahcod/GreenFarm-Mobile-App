import storeModel from "../models/storeModel.js";


// the store repository
export const storeRepository = {

    findById: async (id) =>{
        return storeModel.findById(id)
        .populate("owner","name profile_pic")
    },

    createStore: async (data) =>{
        const store = await new storeModel(data);
        await store.save();
        let populatedDoc = await store.populate("owner","name profile_pic");
        return populatedDoc
    }
}