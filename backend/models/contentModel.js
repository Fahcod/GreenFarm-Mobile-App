import mongoose from "mongoose";

// the content schema
const contentSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content_type:{type:String,required:true,enum:["video","article"]},
    description:{type:String,required:true},
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    viewsCount:{type:Number,default:0},
    files:[{type:String}]
},{timestamps:true})

// the content model
const contentModel = mongoose.models.contents || mongoose.model("contents",contentSchema);
export default contentModel;