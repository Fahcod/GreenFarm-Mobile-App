import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    asked_by:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"users"},
    question:{type:String,required:true},
    answered:{type:Boolean,default:false},
    answerCount:{type:Number,default:0},
    files:[{type:String}],
},{timestamps:true,minimize:false});


const questionModel = mongoose.models.questions || mongoose.model("questions",questionSchema);
export default questionModel
