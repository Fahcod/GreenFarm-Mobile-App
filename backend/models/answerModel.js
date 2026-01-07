import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    answered_by:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"users"},
    answer:{type:String,required:true},
    likesCount:{type:Number,default:0},
    dislikesCount:{type:Number,default:0},
    question_id:{type:mongoose.Schema.Types.ObjectId,required:true}
    
},{timestamps:true});

const answerModel = mongoose.models.answers || mongoose.model("answers",answerSchema);
export default answerModel