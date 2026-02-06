import productModel from "../models/productModel.js";


// the repository for the products
export const productRepository = {

    findOne: async (filter) =>{
        return productModel.findOne(filter)
        .populate("store","name store_profile location description store_contacts dealing_in")
    },

    createProduct: async (data) =>{
        const product = new productModel(data);
        await product.save();
        return product.populate("store","name store_profile location description store_contacts dealing_in")
    },

    deleteOne: async (id) =>{
        return productModel.deleteOne({_id:id})
    },

    findById: async (id)=>{
        return productModel.findById(id).populate("store","name owner")
    }
}