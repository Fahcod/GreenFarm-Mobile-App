import mongoose from "mongoose";


// the review schema
const reviewSchema = new mongoose.Schema({
   message:{type:String,redquired:true},
   belongs_to:{type:mongoose.Schema.Types.ObjectId,required:true},
   created_by:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
   likesCount:{type:Number,default:0},
   dislikesCount:{type:Number,default:0}
},{timestamps:true});

// the review model
const reviewModel = mongoose.models.reviews || mongoose.model("reviews",reviewSchema);
export default reviewModel