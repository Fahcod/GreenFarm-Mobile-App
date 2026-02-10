import mongoose from "mongoose";


// the converstaion model
const conversationSchema = new mongoose.Schema({
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    chatting_with:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    last_message:{type:String}
},{timestamps:true});

const conversationModel = mongoose.models.conversations || 
mongoose.model("conversations",conversationSchema);

export default conversationModel;