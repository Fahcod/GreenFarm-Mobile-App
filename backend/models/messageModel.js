import mongoose from "mongoose";

// the message schema
const messageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    message:{type:String,required:true},
    seen:{type:Boolean,default:false},
    message_type:{type:String,required:true,enum:["image","text"]}
},{timestamps:true});

const messageModel = mongoose.models.messages || mongoose.model("messages",messageSchema);

export default messageModel;