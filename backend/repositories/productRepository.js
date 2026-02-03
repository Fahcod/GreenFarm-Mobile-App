import productModel from "../models/productModel.js";


// the repository for the products
export const productRepository = {

    findOne: async (filter) =>{
        return productModel.findOne(filter)
        .populate("store","name store_profile location description store_contacts dealing_in")
    },

    createProduct: async (data) =>{
        const product = await new productModel(data);
        await product.save();
        let populatedDoc = await 
        product.populate("store","name store_profile description store_contacts");
        return populatedDoc
    },

    deleteOne: async (id) =>{
        return productModel.deleteOne({_id:id})
    },

    findById: async (id)=>{
        return productModel.findById(id).populate("store","name owner")
    }
}