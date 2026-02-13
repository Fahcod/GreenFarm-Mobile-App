import userModel from "../models/userModel.js";


// the repository for handling authentication
export const authRepository = {

    findByEmail: async (email) =>{
       return userModel.findOne({email:email})
    },

    createUser: async (data) =>{
        const user= new userModel(data);
        return user.save()
    },

    updateUserToken: async ({id,new_token}) =>{
        return userModel.updateOne({_id:id},{$set:{refreshToken:new_token}})
    },

    findOne: async (filter) =>{
        return userModel.findOne(filter)
    }
}