import mongoose from "mongoose";


const storeSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"users"},
    dealing_in:{type:[{type:String}],required:true},
    location:{type:{ 
        country:{type:String,required:true},
        city:{type:String,required:true},
        region:{type:String,required:true}
    },required:true},
    description:{type:String,reuired:true},
    store_contacts:{type:[{type:String}],required:true},
    store_profile:{type:String,default:""},
    reviewsCount:{type:Number,default:0}
},{timestamps:true});


const storeModel = mongoose.models.stores || mongoose.model("stores",storeSchema)
export default storeModel;