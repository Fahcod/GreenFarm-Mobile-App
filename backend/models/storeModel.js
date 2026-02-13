import mongoose from "mongoose";

// the sub schema for location
const locationSchema = new mongoose.Schema({
    country:{type:String,required:true},
    city:{type:String,required:true},
    region:{type:String,required:true}
});

//the sub schema for the subscription
const subscriptionSchema = new mongoose.Schema({
     plan:{type:String,required:true,enum:["free","pro","premium"]},
     start_date:{type:Date,required:true},
     end_date:{type:Date,required:true},
     is_active:{type:Boolean,default:false}
});

// the store schema
const storeSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"users"},
    dealing_in:{type:[String],required:true,validate:(v)=>v.length > 0},
    location:{type:locationSchema,required:true},
    description:{type:String,required:true},
    store_contacts:{type:[String],required:true,validate:(v)=>v.length > 0},
    store_profile:{type:String,default:""},
    reviewsCount:{type:Number,default:0},
    subscription:{type:subscriptionSchema,required:true}
},{timestamps:true});

const storeModel = mongoose.models.stores || mongoose.model("stores",storeSchema)
export default storeModel;